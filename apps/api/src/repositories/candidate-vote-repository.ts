import { Create, Update } from "../helpers/helpers";
import { CandidateVote } from "../models/candidate-vote";

/**
 * Creates a candidate vote.
 */
export type CreateCandidateVote = (
  candidateVote: Create<CandidateVote>,
) => Promise<CandidateVote>;

/**
 * Retrieves a candidate vote
 */
export type RetrieveCandidateVote = (
  candidateVoteId: number,
) => Promise<CandidateVote>;

/**
 * Updates a candidate vote.
 */
export type UpdateCandidateVote = (
  candidateVoteId: number,
  candidateVoteUpdate: Update<CandidateVote>,
) => Promise<CandidateVote>;