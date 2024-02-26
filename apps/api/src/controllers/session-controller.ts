import * as Session from '../data/session-data';

/**
 * Creates a new entry in the session table.
 */
export const create = async (sessionCreateParams: Session.Create) => {
  // Enforce some business logic
  const newSession = await Session.create(sessionCreateParams);
  return newSession;
};

/**
 * Retrieves a session by ID.
 */
export const retrieve = async (sessionRetrieveParams: Session.Retrieve) => {
  // Enforce some business logic
  const session = await Session.retrieve(sessionRetrieveParams);
  return session;
};
