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

/**
 * Retrieves a society's election's candidate.
 */
export const retrieve = async (
  electionCandidateRetrieveParams: ElectionCandidate.Retrieve,
) => {
  // Enforce some business logic
  const retrieveElectionCandidate = await ElectionCandidate.retrieve(
    electionCandidateRetrieveParams,
  );
  return retrieveElectionCandidate;
};

/**
 * Updates a society's election's candidate.
 */
export const update = async (
  electionCandidateUpdateParams: ElectionCandidate.Update,
) => {
  // Enforce some business logic
  const updateElectionCandidate = await ElectionCandidate.update(
    electionCandidateUpdateParams,
  );
  return updateElectionCandidate;
};
