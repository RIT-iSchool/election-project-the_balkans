import * as InitiativeVote from '../data/initiative-vote-data';

/**
 * Creates a new entry in the initiative vote vote table.
 */
export const create = async (initiativeVote: InitiativeVote.Create) => {
  // Enforce some business logic
  const newInitiativeVote = await InitiativeVote.create(initiativeVote);
  return newInitiativeVote;
};

/**
 * Retrieves all of a society's election's initiative votes.
 */
export const retrieve = async (initiativeVote: InitiativeVote.Retrieve) => {
  // Enforce some business logic
  const retrieveInitiativeVote = await InitiativeVote.retrieve(initiativeVote);
  return retrieveInitiativeVote;
};
