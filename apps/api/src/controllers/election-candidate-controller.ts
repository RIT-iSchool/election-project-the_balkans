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
 * Retrieve a candidate. If one is not found, it is create and returned. If one is found, it is returned.
 */
export const retrieve = async (
  electionCandidateRetrieveParams: ElectionCandidate.Retrieve,
) => {
  electionCandidateRetrieveParams.name = electionCandidateRetrieveParams.name
    .toLowerCase()
    .trim();

  const retrieveElectionCandidate = await ElectionCandidate.retrieve(
    electionCandidateRetrieveParams,
  );

  if (retrieveElectionCandidate) return retrieveElectionCandidate;

  const newElectionCandidate = await ElectionCandidate.create({
    electionCandidateData: {
      name: electionCandidateRetrieveParams.name,
      societyId: electionCandidateRetrieveParams.societyId,
      electionOfficeId: electionCandidateRetrieveParams.electionOfficeId,
      description: '',
    },
  });

  return newElectionCandidate;
};
