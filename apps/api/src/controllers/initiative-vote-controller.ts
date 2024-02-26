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
 * Lists a society's election's initiative votes.
 */
export const list = async (
  initiativeVoteRetrieveParams: InitiativeVote.List,
) => {
  // Enforce some business logic
  const listInitiativeVote = await InitiativeVote.list(
    initiativeVoteRetrieveParams,
  );
  return listInitiativeVote;
};
