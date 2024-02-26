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
 * Lists a society's election's candidate votes.
 */
export const list = async (candidateVoteRetrieveParams: CandidateVote.List) => {
  // Enforce some business logic
  const listCandidateVote = await CandidateVote.list(
    candidateVoteRetrieveParams,
  );
  return listCandidateVote;
};
