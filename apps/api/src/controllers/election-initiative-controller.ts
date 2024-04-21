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
 * Lists a society's election's initiatives.
 */
export const list = async (
  electionInitiativeRetrieveParams: ElectionInitiative.List,
) => {
  // Enforce some business logic
  const listElectionInitiative = await ElectionInitiative.list(
    electionInitiativeRetrieveParams,
  );
  return listElectionInitiative;
};

/**
 * Retrieves a society's election's initiative.
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

/**
 * Updates a society's election's initiative.
 */
export const update = async (
  electionInitiativeUpdateParams: ElectionInitiative.Update,
) => {
  // Enforce some business logic
  const updateElectionInitiative = await ElectionInitiative.update(
    electionInitiativeUpdateParams,
  );
  return updateElectionInitiative;
};
