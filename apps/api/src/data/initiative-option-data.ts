import { CreateInitiativeOption, UpdateInitiativeOption } from '../db/schema';
import { db } from '../db';
import { initiativeOption, electionInitiative } from '../db/schema';
import { and, eq, getTableColumns } from 'drizzle-orm';

export type Create = {
  initiativeOptionData: CreateInitiativeOption;
};

/**
 * Creates a new entry in the initiative option vote table.
 */
export const create = async ({ initiativeOptionData }: Create) => {
  try {
    const [newInitiativeOption] = await db.transaction(
      async (dbClient) =>
        await dbClient
          .insert(initiativeOption)
          .values(initiativeOptionData)
          .returning(),
    );
    return newInitiativeOption!;
  } catch (err) {
    throw new Error('Something went wrong creating a initiative option.');
  }
};

export type List = {
  electionId: number;
  societyId: number;
};

/**
 * Lists a society's election's initiative options.
 */
export const list = async ({ electionId, societyId }: List) => {
  try {
    const initiativeOptionData = await db
      .select({
        ...getTableColumns(initiativeOption),
      })
      .from(initiativeOption)
      .innerJoin(
        electionInitiative,
        eq(initiativeOption.electionInitiativeId, electionInitiative.id),
      )
      .where(
        and(
          eq(electionInitiative.electionId, electionId),
          eq(electionInitiative.societyId, societyId),
        ),
      );

    return initiativeOptionData;
  } catch (err) {
    throw new Error('Something went wrong listing election initative options.');
  }
};

export type Retrieve = {
  initiativeOptionId: number;
};

/**
 * Retrieves a society's election initiative option.
 */
export const retrieve = async ({ initiativeOptionId }: Retrieve) => {
  try {
    const [initiativeOptionData] = await db
      .select({
        ...getTableColumns(initiativeOption),
      })
      .from(initiativeOption)
      .where(eq(initiativeOption.id, initiativeOptionId));

    return initiativeOptionData;
  } catch (err) {
    throw new Error('Something went wrong retrieving an initiative option.');
  }
};

export type Update = {
  initiativeOptionId: number;
  initiativeOptionData: UpdateInitiativeOption;
};

/**
 * Updates an initiative option by ID
 */
export const update = async ({
  initiativeOptionId,
  initiativeOptionData,
}: Update) => {
  try {
    const [updatedInitiativeOption] = await db.transaction(
      async (dbClient) =>
        await dbClient
          .update(initiativeOption)
          .set(initiativeOptionData)
          .where(eq(initiativeOption.id, initiativeOptionId))
          .returning(),
    );
    return updatedInitiativeOption!;
  } catch (err) {
    throw new Error('Something went wrong updating an initiative option.');
  }
};

export type Remove = {
  initiativeOptionId: number;
};

/**
 * Removes an initiative option by ID
 */
export const remove = async ({ initiativeOptionId }: Remove) => {
  try {
    await db.transaction(
      async (dbClient) =>
        await dbClient
          .delete(initiativeOption)
          .where(eq(initiativeOption.id, initiativeOptionId)),
    );
  } catch (err) {
    throw new Error('Something went wrong deleting an initiative option.');
  }
};
