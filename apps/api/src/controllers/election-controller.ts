import * as Election from '../data/election-data';

export const create = async (election: Election.Create) => {
  // Enforce some business logic

  const newElection = await Election.create(election);

  return newElection;
};

export const list = async (election: Election.List) => {
  const listElection = await Election.list(election);
  return listElection;
};

export const retrieve = async (election: Election.Retrieve) => {
  const retrieveElection = await Election.retrieve(election);
  return retrieveElection;
};
