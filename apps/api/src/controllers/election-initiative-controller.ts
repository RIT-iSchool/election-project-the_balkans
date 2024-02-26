import * as ElectionInitiative from '../data/election-initiative-data';

/**
 * Creates a new entry in the election initiative table.
 */
export const create = async (
  electionInitiativeCreateParams: ElectionInitiative.Create,
) => {
  // Enforce some business logic
  const newElectionInitiative = await ElectionInitiative.create(
    electionInitiativeCreateParams,
  );
  return newElectionInitiative;
};

/**
 * Retrieves all of a society's election's initiatives.
 */
export const retrieve = async (
  electionInitiativeRetrieveParams: ElectionInitiative.Retrieve,
) => {
  // Enforce some business logic
  const retrieveElectionInitiative = await ElectionInitiative.retrieve(
    electionInitiativeRetrieveParams,
  );
  return retrieveElectionInitiative;
};
