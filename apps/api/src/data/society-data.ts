import { CreateSociety, society } from '../db/schema';
import { db } from '../db';
import { eq } from 'drizzle-orm';

export type Create = {
  societyData: CreateSociety;
};

/**
 * Creates a new entry in the society table.
 */
export const create = async ({ societyData }: Create) => {
  try {
    await db.transaction(async (dbClient) => {
      const [newSociety] = await dbClient
        .insert(society)
        .values(societyData)
        .returning();
      return newSociety!;
    });
  } catch (err) {
    throw new Error('Something went wrong creating a society.');
  }
};

export type Retrieve = {
  societyId: number;
};

/**
 * Retrieves a society by ID
 */
export const retrieve = async ({ societyId }: Retrieve) => {
  try {
    const [societyData] = await db
      .select()
      .from(society)
      .where(eq(society.id, societyId));

    if (!societyData) throw new Error('Society not found');

    return societyData;
  } catch (err) {
    throw new Error('Something went wrong retrieving a society.');
  }
};
