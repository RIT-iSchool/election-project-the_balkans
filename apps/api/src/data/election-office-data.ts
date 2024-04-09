import { CreateElectionOffice } from '../db/schema';
import { db } from '../db';
import { electionOffice } from '../db/schema';
import { and, eq } from 'drizzle-orm';

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
      .select()
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
