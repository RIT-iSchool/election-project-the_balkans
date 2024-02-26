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
 * Retrieves all of a society's election's candidates.
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
