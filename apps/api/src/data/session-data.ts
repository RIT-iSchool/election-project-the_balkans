import {
  CreateSession,
  session,
  society,
  societyMember,
  user,
} from '../db/schema';
import { db } from '../db';
import { eq } from 'drizzle-orm';

export type Create = CreateSession;

/**
 * Creates a new entry in the session table.
 */
export const create = async (sessionData: CreateSession) => {
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
  societyId: number;
  userId: number;
};

/**
 * Retrieves a session by ID.
 */
export const retrieve = async ({
  sessionToken,
  societyId,
  userId,
}: Retrieve) => {
  try {
    const [sessionData] = await db
      .select({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin,
      })
      .from(session)
      .innerJoin(user, eq(session.userId, user.id))
      .where(eq(session.token, sessionToken));

    if (!sessionData) throw new Error('Session not found');

    const societies = await db
      .select({ id: society.id, name: society.name })
      .from(societyMember)
      .leftJoin(society, eq(society.id, societyMember.societyId))
      .where(eq(societyMember.userId, userId));

    const [currentSociety] = await db
      .select({
        id: society.id,
        name: society.name,
      })
      .from(society)
      .where(eq(society.id, societyId));

    return { ...sessionData, societies, society: currentSociety };
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
