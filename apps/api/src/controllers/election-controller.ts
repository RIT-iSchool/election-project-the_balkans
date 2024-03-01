import * as Election from '../data/election-data';

/**
 * Creates a new entry in the election table.
 */
export const create = async (electionCreateParams: Election.Create) => {
  // Enforce some business logic
  const newElection = await Election.create(electionCreateParams);
  return newElection;
};

/**
 * Lists a society's elections.
 */
export const list = async (electionListParams: Election.List) => {
  // Enforce some business logic
  const listElection = await Election.list(electionListParams);
  return listElection;
};

/**
 * Retrieves a society's election's election.
 */
export const retrieve = async (electionRetrieveParams: Election.Retrieve) => {
  // Enforce some business logic
  const retrieveElection = await Election.retrieve(electionRetrieveParams);
  return retrieveElection;
};

/**
 * Updates a society's election's election.
 */
export const update = async (electionRetrieveParams: Election.Update) => {
  // Enforce some business logic
  const updateElection = await Election.update(electionRetrieveParams);
  return updateElection;
};
