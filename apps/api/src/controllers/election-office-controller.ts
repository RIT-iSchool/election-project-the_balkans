import * as ElectionOffice from '../data/election-office-data';

/**
 * Creates a new entry in the election office table.
 */
export const create = async (electionOffice: ElectionOffice.Create) => {
  // Enforce some business logic
  const newElectionOffce = await ElectionOffice.create(electionOffice);
  return newElectionOffce;
};

/**
 * Retrieves all of a society's election's offices.
 */
export const retrieve = async (electionOffice: ElectionOffice.Retrieve) => {
  // Enforce some business logic
  const retrieveElectionOffice = await ElectionOffice.retrieve(electionOffice);
  return retrieveElectionOffice;
};
