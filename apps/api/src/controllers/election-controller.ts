import * as Election from '../data/election-data';

export const create = async (election: Election.Create) => {
  // Enforce some business logic

  const newElection = await Election.create(election);

  return newElection;
};
