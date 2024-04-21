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
 * Lists a society's election's offices.
 */
export const list = async (
  electionOfficeRetrieveParams: ElectionOffice.List,
) => {
  // Enforce some business logic
  const listElectionOffice = await ElectionOffice.list(
    electionOfficeRetrieveParams,
  );
  return listElectionOffice;
};

/**
 * Retrieves a society's election's office.
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

/**
 * Updates a society's election's office.
 */
export const update = async (
  electionOfficeUpdateParams: ElectionOffice.Update,
) => {
  // Enforce some business logic
  const updateElectionOffice = await ElectionOffice.update(
    electionOfficeUpdateParams,
  );
  return updateElectionOffice;
};
