import {
  CreateSession,
  session,
  society,
  societyMember,
  user,
} from '../db/schema';
import { db } from '../db';
import { eq, getTableColumns } from 'drizzle-orm';

export type Create = CreateSession;

/**
 * Creates a new entry in the session table.
 */
export const create = async ({ ...sessionData }: CreateSession) => {
  try {
    const [newSession] = await db.transaction(
      async (dbClient) =>
        await dbClient.insert(session).values(sessionData).returning(),
    );
    return newSession!;
  } catch (err) {
    throw new Error('Something went wrong creating a session.');
  }
};

export type Retrieve = {
  sessionToken: string;
  userId: number;
};

/**
 * Retrieves a session by ID.
 */
export const retrieve = async ({ sessionToken, userId }: Retrieve) => {
  try {
    const [sessionData] = await db
      .select({ ...getTableColumns(user) })
      .from(session)
      .innerJoin(user, eq(session.userId, user.id))
      .where(eq(session.token, sessionToken));

    if (!sessionData) throw new Error('Session not found');

    const societies = await db
      .select({ society: getTableColumns(society) })
      .from(societyMember)
      .leftJoin(society, eq(society.id, societyMember.societyId))
      .where(eq(societyMember.userId, userId));

    return { ...sessionData, societies };
  } catch (err) {
    throw new Error('Something went wrong retrieving a session.');
  }
};

export type Remove = {
  sessionToken: string;
};

/**
 * Deletes a session by Token
 */
export const remove = async ({ sessionToken }: Remove) => {
  try {
    await db.delete(session).where(eq(session.token, sessionToken));
  } catch (err) {
    throw new Error('Something went wrong deleting a session');
  }
};
