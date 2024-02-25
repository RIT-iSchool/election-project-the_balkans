import { CreateElectionOffice } from '../db/schema';
import { db } from '../db';
import { electionOffice, election } from '../db/schema';
import { and, eq } from 'drizzle-orm';

export type Create = {
  electionOfficeData: CreateElectionOffice;
};

/**
 * Creates a new entry in the election office table.
 */
export const create = async ({ electionOfficeData }: Create) => {
  try {
    const [newElectionOffice] = await db
      .insert(electionOffice)
      .values(electionOfficeData)
      .returning();
    return newElectionOffice!;
  } catch (err) {
    throw new Error('Something went wrong creating an election office.');
  }
};

export type Retrieve = {
  electionId: number;
  societyId: number;
};

/**
 * Retrieves all of a society's election's offices.
 */
export const retrieve = async ({ electionId, societyId }: Retrieve) => {
  try {
    const [electionOfficeData] = await db
      .select()
      .from(electionOffice)
      .innerJoin(election, eq(electionOffice.electionId, election.id))
      .where(
        and(eq(election.id, electionId), eq(election.societyId, societyId)),
      );
    return electionOfficeData;
  } catch (err) {
    throw new Error('Something went wrong retrieving an election office.');
  }
};
