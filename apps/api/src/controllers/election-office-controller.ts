import * as ElectionOffice from '../data/election-office-data';

/**
 * Creates a new entry in the election office table.
 */
export const create = async (
  electionOfficeCreateParams: ElectionOffice.Create,
) => {
  // Enforce some business logic
  const newElectionOffce = await ElectionOffice.create(
    electionOfficeCreateParams,
  );
  return newElectionOffce;
};

/**
 * Retrieves all of a society's election's offices.
 */
export const retrieve = async (
  electionOfficeRetrieveParams: ElectionOffice.Retrieve,
) => {
  // Enforce some business logic
  const retrieveElectionOffice = await ElectionOffice.retrieve(
    electionOfficeRetrieveParams,
  );
  return retrieveElectionOffice;
};
