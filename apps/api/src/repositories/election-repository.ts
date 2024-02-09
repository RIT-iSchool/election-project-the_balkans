import { Create, Update } from "../helpers";
import { Election } from "../models/election";

/**
 * Creates an election.
 */
export type CreateElection = (election: Create<Election>) => Promise<Election>;

/**
 * Retrieves an election.
 */
export type RetrieveElection = (electionId: number) => Promise<Election>;

/**
 * Updates an election
 */
export type UpdateElection = (
  electionId: number,
  electionUpdate: Update<Election>,
) => Promise<Election>;