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
 * Retrieves all of a society's election's initiative options.
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
