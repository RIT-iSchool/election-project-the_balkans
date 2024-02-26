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
 * Lists all of a society's elections.
 */
export const list = async (electionListParams: Election.List) => {
  // Enforce some business logic
  const listElection = await Election.list(electionListParams);
  return listElection;
};

/**
 * Retrieves all of a society's election's elections.
 */
export const retrieve = async (electionRetrieveParams: Election.Retrieve) => {
  // Enforce some business logic
  const retrieveElection = await Election.retrieve(electionRetrieveParams);
  return retrieveElection;
};
