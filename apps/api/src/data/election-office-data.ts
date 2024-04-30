import { CreateElectionOffice, UpdateElectionOffice } from '../db/schema';
import { db } from '../db';
import { electionOffice } from '../db/schema';
import { and, eq, getTableColumns } from 'drizzle-orm';

export type Create = {
  electionOfficeData: CreateElectionOffice;
};

/**
 * Creates a new entry in the election office table.
 */
export const create = async ({ electionOfficeData }: Create) => {
  try {
    const [newElectionOffice] = await db.transaction(
      async (dbClient) =>
        await dbClient
          .insert(electionOffice)
          .values(electionOfficeData)
          .returning(),
    );
    return newElectionOffice!;
  } catch (err) {
    console.log(err);
    throw new Error('Something went wrong creating an election office.');
  }
};

export type List = {
  electionId: number;
  societyId: number;
};

/**
 * Lists a society's election's offices.
 */
export const list = async ({ electionId, societyId }: List) => {
  try {
    const electionOfficeData = await db
      .select({
        ...getTableColumns(electionOffice),
      })
      .from(electionOffice)
      .where(
        and(
          eq(electionOffice.electionId, electionId),
          eq(electionOffice.societyId, societyId),
        ),
      );

    return electionOfficeData;
  } catch (err) {
    throw new Error('Something went wrong listing election offices.');
  }
};

export type Retrieve = { electionId: number; electionOfficeId: number };

/**
 * Retrieves a society's election office.
 */
export const retrieve = async ({ electionId, electionOfficeId }: Retrieve) => {
  try {
    const [electionOfficeData] = await db
      .select({
        ...getTableColumns(electionOffice),
      })
      .from(electionOffice)
      .where(
        and(
          eq(electionOffice.id, electionOfficeId),
          eq(electionOffice.electionId, electionId),
        ),
      );

    if (!electionOfficeData) throw new Error('Election office not found');

    return electionOfficeData;
  } catch (err) {
    throw new Error('Something went wrong retrieving election office.');
  }
};

export type Update = {
  electionId: number;
  electionOfficeId: number;
  electionOfficeData: UpdateElectionOffice;
};

/**
 * Updates an election office by ID
 */
export const update = async ({
  electionId,
  electionOfficeId,
  electionOfficeData,
}: Update) => {
  try {
    const [updatedElectionOffice] = await db.transaction(
      async (dbClient) =>
        await dbClient
          .update(electionOffice)
          .set(electionOfficeData)
          .where(
            and(
              eq(electionOffice.id, electionOfficeId),
              eq(electionOffice.electionId, electionId),
            ),
          )
          .returning(),
    );

    if (!updatedElectionOffice) throw new Error('Election office not found');

    return updatedElectionOffice;
  } catch (err) {
    throw new Error('Something went wrong updating election office.');
  }
};

export type Remove = { electionId: number; electionOfficeId: number };

/**
 * Removes an election office by ID
 */
export const remove = async ({ electionId, electionOfficeId }: Remove) => {
  try {
    await db.transaction(
      async (dbClient) =>
        await dbClient
          .delete(electionOffice)
          .where(
            and(
              eq(electionOffice.id, electionOfficeId),
              eq(electionOffice.electionId, electionId),
            ),
          ),
    );
  } catch (err) {
    throw new Error('Something went wrong removing election office.');
  }
};
