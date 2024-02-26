import * as CandidateVote from '../data/candidate-vote-data';

/**
 * Creates a new entry in the candidate vote table.
 */
export const create = async (
  candidateVoteCreateParams: CandidateVote.Create,
) => {
  // Enforce some business logic
  const newCandidateVote = await CandidateVote.create(
    candidateVoteCreateParams,
  );
  return newCandidateVote;
};

/**
 * Retrieves all of a society's election's candidate votes.
 */
export const retrieve = async (
  candidateVoteRetrieveParams: CandidateVote.Retrieve,
) => {
  // Enforce some business logic
  const retrieveCandidateVote = await CandidateVote.retrieve(
    candidateVoteRetrieveParams,
  );
  return retrieveCandidateVote;
};
