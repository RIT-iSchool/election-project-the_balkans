import { Create, Update } from "../helpers/helpers";
import { Session } from "../models/session";

/**
 * Creates a session.
 */
export type CreateSession = (session: Create<Session>) => Promise<Session>;

/**
 * Retrieves a session.
 */
export type RetrieveSession = (sessionId: string) => Promise<Session>;

/**
 * Updates a session.
 */
export type UpdateSession = (
  sessionId: string,
  sessionUpdate: Update<Session>,
) => Promise<Session>;