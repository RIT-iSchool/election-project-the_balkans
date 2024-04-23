import { CreateElection, Role, UpdateElection } from '../db/schema';
import { db } from '../db';
import { election } from '../db/schema';
import { and, asc, eq, getTableColumns, gt, lt, or } from 'drizzle-orm';

export type Create = {
  electionData: CreateElection;
};

/**
 * Creates a new entry in the election table.
 */
export const create = async ({ electionData }: Create) => {
  try {
    const [newElection] = await db.transaction(
      async (dbClient) =>
        await dbClient.insert(election).values(electionData).returning(),
    );
    return newElection!;
  } catch (err) {
    throw new Error('Something went wrong creating an election');
  }
};

export type List = { societyId: number; admin: boolean };

/**
 * Lists a society's elections.
 */
export const list = async ({ societyId, admin }: List) => {
  try {
    const electionsQuery = db
      .select({
        ...getTableColumns(election),
      })
      .from(election)
      .where(and(eq(election.societyId, societyId)))
      .orderBy(asc(election.startDate))
      .$dynamic();

    if (!admin) {
      electionsQuery.where(
        or(
          gt(election.startDate, new Date().toString()),
          lt(election.endDate, new Date().toString()),
        ),
      );
    }

    return await electionsQuery;
  } catch (err) {
    throw new Error('Something went wrong listing elections');
  }
};

export type Retrieve = {
  electionId: number;
  societyId: number;
};

/**
 * Retrieves a society's election's election.
 */
export const retrieve = async ({ electionId, societyId }: Retrieve) => {
  try {
    const [electionData] = await db
      .select({
        ...getTableColumns(election),
      })
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

export type Update = {
  electionId: number;
  societyId: number;
  electionData: UpdateElection;
};

/**
 * Updates an election by ID
 */
export const update = async ({
  electionId,
  societyId,
  electionData,
}: Update) => {
  try {
    const updatedElection = await db.transaction(async (dbClient) => {
      const [electionRow] = await dbClient
        .update(election)
        .set(electionData)
        .where(
          and(eq(election.id, electionId), eq(election.societyId, societyId)),
        )
        .returning();

      if (!electionRow) throw new Error('Election not found');

      return electionRow;
    });

    return updatedElection;
  } catch (err) {
    console.log(err);
    throw new Error('Something went wrong updating an election');
  }
};
