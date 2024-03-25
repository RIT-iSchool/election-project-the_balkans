import { CreateSession, session, user } from '../db/schema';
import { db } from '../db';
import { eq } from 'drizzle-orm';

export type Create = CreateSession;

/**
 * Creates a new entry in the session table.
 */
export const create = async ({ ...sessionData }: CreateSession) => {
  try {
    const [newSession] = await db
      .insert(session)
      .values(sessionData)
      .returning();
    return newSession!;
  } catch (err) {
    throw new Error('Something went wrong creating a session.');
  }
};

export type Retrieve = {
  sessionToken: string;
};

/**
 * Retrieves a session by ID.
 */
export const retrieve = async ({ sessionToken }: Retrieve) => {
  try {
    const [sessionData] = await db
      .select()
      .from(session)
      .innerJoin(user, eq(session.userId, user.id))
      .where(eq(session.token, sessionToken));

    if (!sessionData) throw new Error('Session not found');

    return sessionData;
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
