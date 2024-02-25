import { CreateInitiativeOption } from '../db/schema';
import { db } from '../db';
import { initiativeOption, electionInitiative, election } from '../db/schema';
import { and, eq } from 'drizzle-orm';

export type Create = {
  initiativeOptionData: CreateInitiativeOption;
};

/**
 * Creates a new entry in the initiative option vote table.
 */
export const create = async ({ initiativeOptionData }: Create) => {
  try {
    const [newInitiativeOption] = await db
      .insert(initiativeOption)
      .values(initiativeOptionData)
      .returning();
    return newInitiativeOption!;
  } catch (err) {
    throw new Error('Something went wrong creating a initiative option.');
  }
};

export type Retrieve = {
  electionId: number;
  societyId: number;
};

/**
 * Retrieves all of a society's election's initiative options.
 */
export const retrieve = async ({ electionId, societyId }: Retrieve) => {
  try {
    const [initiativeOptionData] = await db
      .select()
      .from(initiativeOption)
      .innerJoin(
        electionInitiative,
        eq(initiativeOption.electionInitiativeId, electionInitiative.id),
      )
      .innerJoin(election, eq(electionInitiative.electionId, election.id))
      .where(
        and(eq(election.id, electionId), eq(election.societyId, societyId)),
      );
    return initiativeOptionData!;
  } catch (err) {
    throw new Error(
      'Something went wrong retrieving election initative options.',
    );
  }
};
