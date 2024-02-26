import * as CandidateVote from '../data/candidate-vote-data';

/**
 * Creates a new entry in the candidate vote table.
 */
export const create = async (candidateVote: CandidateVote.Create) => {
  // Enforce some business logic
  const newCandidateVote = await CandidateVote.create(candidateVote);
  return newCandidateVote;
};

/**
 * Retrieves all of a society's election's candidate votes.
 */
export const retrieve = async (candidateVote: CandidateVote.Retrieve) => {
  // Enforce some business logic
  const retrieveCandidateVote = await CandidateVote.retrieve(candidateVote);
  return retrieveCandidateVote;
};
