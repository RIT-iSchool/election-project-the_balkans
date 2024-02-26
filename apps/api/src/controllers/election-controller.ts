import * as Election from '../data/election-data';

/**
 * Creates a new entry in the election table.
 */
export const create = async (election: Election.Create) => {
  // Enforce some business logic
  const newElection = await Election.create(election);
  return newElection;
};

/**
 * Lists all of a society's elections.
 */
export const list = async (election: Election.List) => {
  // Enforce some business logic
  const listElection = await Election.list(election);
  return listElection;
};

/**
 * Retrieves all of a society's election's elections.
 */
export const retrieve = async (election: Election.Retrieve) => {
  // Enforce some business logic
  const retrieveElection = await Election.retrieve(election);
  return retrieveElection;
};
