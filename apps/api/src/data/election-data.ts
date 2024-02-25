import { CreateElection } from '../db/schema';
import { db } from '../db';
import { election } from '../db/schema';
import { and, eq } from 'drizzle-orm';

export type Create = {
  electionData: CreateElection;
};

/**
 * Creates a new entry in the election table.
 */
export const create = async ({ electionData }: Create) => {
  try {
    const [newElection] = await db
      .insert(election)
      .values(electionData)
      .returning();

    return newElection!;
  } catch (err) {
    throw new Error('Something went wrong creating an election');
  }
};

export type List = { societyId: number };

/**
 * Lists all of a society's elections.
 */
export const list = async ({ societyId }: List) => {
  try {
    const electionData = await db
      .select()
      .from(election)
      .where(eq(election.societyId, societyId));

    return electionData;
  } catch (err) {
    throw new Error('Something went wrong listing elections');
  }
};

export type Retrieve = {
  electionId: number;
  societyId: number;
};

/**
 * Retrieves all of a society's election's elections.
 */
export const retrieve = async ({ electionId, societyId }: Retrieve) => {
  try {
    const [electionData] = await db
      .select()
      .from(election)
      .where(
        and(eq(election.id, electionId), eq(election.societyId, societyId)),
      );

    if (!electionData) throw new Error('Election not found');

    return electionData;
  } catch (err) {
    throw new Error('Something went wrong retrieving an election');
  }
};
