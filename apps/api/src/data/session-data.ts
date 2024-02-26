import { CreateSession, session, user } from '../db/schema';
import { db } from '../db';
import { eq } from 'drizzle-orm';

export type Create = {
  sessionData: CreateSession;
};

/**
 * Creates a new entry in the session table.
 */
export const create = async ({ sessionData }: Create) => {
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
  sessionId: number;
};

/**
 * Retrieves a session by ID.
 */
export const retrieve = async ({ sessionId }: Retrieve) => {
  try {
    const [sessionData] = await db
      .select()
      .from(session)
      .innerJoin(user, eq(session.userId, user.id))
      .where(eq(session.id, sessionId));

    if (!sessionData) throw new Error('Session not found');

    return sessionData;
  } catch (err) {
    throw new Error('Something went wrong retrieving a session.');
  }
};
