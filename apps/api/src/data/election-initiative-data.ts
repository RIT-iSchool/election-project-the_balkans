import {
  CreateElectionInitiative,
  UpdateElectionInitiative,
} from '../db/schema';
import { db } from '../db';
import { electionInitiative } from '../db/schema';
import { and, eq, getTableColumns } from 'drizzle-orm';

export type Create = {
  electionInitiativeData: CreateElectionInitiative;
};

/**
 * Creates a new entry in the election candidate table.
 */
export const create = async ({ electionInitiativeData }: Create) => {
  try {
    const [newElectionInitiative] = await db.transaction(
      async (dbClient) =>
        await dbClient
          .insert(electionInitiative)
          .values(electionInitiativeData)
          .returning(),
    );
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
      .select({
        ...getTableColumns(electionInitiative),
      })
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

export type Retrieve = {
  electionInitiativeId: number;
};

/**
 * Retrieves a society's election initiative.
 */
export const retrieve = async ({ electionInitiativeId }: Retrieve) => {
  try {
    const [electionInitiativeData] = await db
      .select({
        ...getTableColumns(electionInitiative),
      })
      .from(electionInitiative)
      .where(eq(electionInitiative.id, electionInitiativeId));

    if (!electionInitiativeData)
      throw new Error('Election initiative not found');

    return electionInitiativeData;
  } catch (err) {
    throw new Error('Something went wrong retrieving election initiative.');
  }
};

export type Update = {
  electionInitiativeId: number;
  electionInitiativeData: UpdateElectionInitiative;
};

/**
 * Updates an election initiative by ID
 */
export const update = async ({
  electionInitiativeId,
  electionInitiativeData,
}: Update) => {
  try {
    const [updatedElectionInitiative] = await db.transaction(
      async (dbClient) =>
        await dbClient
          .update(electionInitiative)
          .set(electionInitiativeData)
          .where(eq(electionInitiative.id, electionInitiativeId))
          .returning(),
    );

    if (!updatedElectionInitiative)
      throw new Error('Election initiative not found');

    return updatedElectionInitiative;
  } catch (err) {
    throw new Error('Something went wrong updating election initiative.');
  }
};
