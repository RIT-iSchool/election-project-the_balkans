import { Create, Update } from "../helpers/helpers";
import { InitiativeVote } from "../models/initiative-vote";

/**
 * Creates an initiative vote.
 */
export type CreateInitiativeVote = (
  initiativeVote: Create<InitiativeVote>,
) => Promise<InitiativeVote>;

/**
 * Retrives an initiative vote.
 */
export type RetrieveInitiativeVote = (
  initiativeVoteId: number,
) => Promise<InitiativeVote>;

/**
 * Updates an initiative vote.
 */
export type UpdateInitiativeVote = (
  initiativeVoteId: number,
  initiativeVoteUpdate: Update<InitiativeVote>,
) => Promise<InitiativeVote>;