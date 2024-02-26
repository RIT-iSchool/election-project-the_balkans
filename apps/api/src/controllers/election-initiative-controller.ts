import * as ElectionInitiative from '../data/election-initiative-data';

/**
 * Creates a new entry in the election candidate table.
 */
export const create = async (electionInitiative: ElectionInitiative.Create) => {
  // Enforce some business logic
  const newElectionInitiative =
    await ElectionInitiative.create(electionInitiative);
  return newElectionInitiative;
};

/**
 * Retrieves all a society's election's initiatives.
 */
export const retrieve = async (
  electionInitiative: ElectionInitiative.Retrieve,
) => {
  // Enforce some business logic
  const retrieveElectionInitiative =
    await ElectionInitiative.retrieve(electionInitiative);
  return retrieveElectionInitiative;
};
