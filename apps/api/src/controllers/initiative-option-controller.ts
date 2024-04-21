import * as InitiativeOption from '../data/initiative-option-data';

/**
 * Creates a new entry in the initiative option vote table.
 */
export const create = async (
  initiativeOptionCreateParams: InitiativeOption.Create,
) => {
  // Enforce some business logic
  const newInitiativeOption = await InitiativeOption.create(
    initiativeOptionCreateParams,
  );
  return newInitiativeOption;
};

/**
 * Lists a society's election's initiative options.
 */
export const list = async (
  initiativeOptionRetrieveParams: InitiativeOption.List,
) => {
  // Enforce some business logic
  const listInitiativeOption = await InitiativeOption.list(
    initiativeOptionRetrieveParams,
  );
  return listInitiativeOption;
};

/**
 * Retrieves a society's election's initiative option.
 */
export const retrieve = async (
  initiativeOptionRetrieveParams: InitiativeOption.Retrieve,
) => {
  // Enforce some business logic
  const retrieveInitiativeOption = await InitiativeOption.retrieve(
    initiativeOptionRetrieveParams,
  );
  return retrieveInitiativeOption;
};

/**
 * Updates a society's election's initiative option.
 */
export const update = async (
  initiativeOptionUpdateParams: InitiativeOption.Update,
) => {
  // Enforce some business logic
  const updateInitiativeOption = await InitiativeOption.update(
    initiativeOptionUpdateParams,
  );
  return updateInitiativeOption;
};
