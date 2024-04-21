import { CreateSociety, society, user } from '../db/schema';
import { db, withPagination } from '../db';
import { eq, getTableColumns, ilike } from 'drizzle-orm';

export type Create = {
  societyData: CreateSociety;
};

/**
 * Creates a new entry in the society table.
 */
export const create = async ({ societyData }: Create) => {
  try {
    const [newSociety] = await db.transaction(
      async (dbClient) =>
        await dbClient.insert(society).values(societyData).returning(),
    );
    return newSociety!;
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

export type List = {
  search?: string;
  page?: number;
};

/**
 * Lists societies based on a search query
 */
export const list = async ({ search, page }: List) => {
  try {
    const societiesQuery = db
      .select({
        ...getTableColumns(society),
        owner: getTableColumns(user),
      })
      .from(society)
      .leftJoin(user, eq(user.id, society.ownerId))
      .$dynamic();

    if (search) societiesQuery.where(ilike(society.name, `%${search}%`));

    const societies = await withPagination(societiesQuery, page);

    return societies;
  } catch (err) {
    throw new Error('Something went wrong listing societies.');
  }
};
