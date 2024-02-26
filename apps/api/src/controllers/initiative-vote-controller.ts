import * as InitiativeVote from '../data/initiative-vote-data';

/**
 * Creates a new entry in the initiative vote vote table.
 */
export const create = async (
  initiativeVoteCreateParams: InitiativeVote.Create,
) => {
  // Enforce some business logic
  const newInitiativeVote = await InitiativeVote.create(
    initiativeVoteCreateParams,
  );
  return newInitiativeVote;
};

/**
 * Retrieves all of a society's election's initiative votes.
 */
export const retrieve = async (
  initiativeVoteRetrieveParams: InitiativeVote.Retrieve,
) => {
  // Enforce some business logic
  const retrieveInitiativeVote = await InitiativeVote.retrieve(
    initiativeVoteRetrieveParams,
  );
  return retrieveInitiativeVote;
};
