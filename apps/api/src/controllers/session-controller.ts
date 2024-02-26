import * as Session from '../data/session-data';

/**
 * Creates a new entry in the session table.
 */
export const create = async ({ sessionData }: Session.Create) => {
  // Enforce some business logic
  const newSession = await Session.create({ sessionData });
  return newSession;
};

/**
 * Retrieves a session by ID.
 */
export const retrieve = async ({ sessionId }: Session.Retrieve) => {
  // Enforce some business logic
  const session = await Session.retrieve({ sessionId });
  return session;
};
