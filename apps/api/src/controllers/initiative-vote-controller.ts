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
