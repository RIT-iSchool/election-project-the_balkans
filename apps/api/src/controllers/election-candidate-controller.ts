import * as ElectionCandidate from '../data/election-candidate-data';

/**
 * Creates a new entry in the election candidate table.
 */
export const create = async (
  electionCandidateCreateParams: ElectionCandidate.Create,
) => {
  // Enforce some business logic
  const newElectionCandidate = await ElectionCandidate.create(
    electionCandidateCreateParams,
  );
  return newElectionCandidate;
};

/**
 * Lists a society's election's candidates.
 */
export const list = async (
  electionCandidateListParams: ElectionCandidate.List,
) => {
  // Enforce some business logic
  const listElectionCandidate = await ElectionCandidate.list(
    electionCandidateListParams,
  );
  return listElectionCandidate;
};
