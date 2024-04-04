import { CreateElectionInitiative } from '../db/schema';
import { db } from '../db';
import { electionInitiative } from '../db/schema';
import { and, eq } from 'drizzle-orm';

export type Create = {
  electionInitiativeData: CreateElectionInitiative;
};

/**
 * Creates a new entry in the election candidate table.
 */
export const create = async ({ electionInitiativeData }: Create) => {
  try {
    const [newElectionInitiative] = await db
      .insert(electionInitiative)
      .values(electionInitiativeData)
      .returning();

    return newElectionInitiative!;
  } catch (err) {
    throw new Error('Something went wrong creating an election initiative.');
  }
};

export type List = {
  electionId: number;
  societyId: number;
};

/**
 * Lists a society's election's initiatives.
 */
export const list = async ({ electionId, societyId }: List) => {
  try {
    const electionInitiativeData = await db
      .select()
      .from(electionInitiative)
      .where(
        and(
          eq(electionInitiative.electionId, electionId),
          eq(electionInitiative.societyId, societyId),
        ),
      );

    return electionInitiativeData;
  } catch (err) {
    throw new Error('Something went wrong listing election initiatives.');
  }
};
