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
