import {
  candidateVote,
  CreateSociety,
  election,
  society,
  societyMember,
  user,
} from '../db/schema';
import { db } from '../db';
import { eq, getTableColumns, ilike, lte, gte, and, count } from 'drizzle-orm';

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
};

/**
 * Lists societies based on a search query
 */
export const list = async ({ search }: List) => {
  try {
    const societiesQuery = db
      .select({
        ...getTableColumns(society),
        owner: getTableColumns(user),
      })
      .from(society)
      .leftJoin(user, eq(user.id, society.ownerId));

    if (search) societiesQuery.where(ilike(society.name, `%${search}%`));

    const societies = await societiesQuery;

    return societies;
  } catch (err) {
    throw new Error('Something went wrong listing societies.');
  }
};

export type Report = {
  societyId: number;
};

/**
 * Reports the number of active and inactive ballots, number of users per society, avgerage number of members voting in each election.
 */
export const report = async ({ societyId }: Report) => {
  try {
    const activeBallots =
      (
        await db
          .select({ count: count() })
          .from(election)
          .where(
            and(
              eq(election.societyId, societyId),
              lte(election.startDate, new Date()),
              gte(election.endDate, new Date()),
            ),
          )
      ).pop()?.count ?? 0;

    const inActiveBallots =
      (
        await db
          .select({ count: count() })
          .from(election)
          .where(
            and(
              eq(election.societyId, societyId),
              gte(election.startDate, new Date()),
              lte(election.endDate, new Date()),
            ),
          )
      ).pop()?.count ?? 0;

    const societyUsers =
      (
        await db
          .select({ count: count() })
          .from(societyMember)
          .where(eq(societyMember.societyId, societyId))
      ).pop()?.count ?? 0;

    const votingMembers =
      (
        await db
          .select({ count: count() })
          .from(candidateVote)
          .innerJoin(societyMember, eq(societyMember.societyId, societyId))
      ).pop()?.count ?? 0;

    const elections = activeBallots + inActiveBallots;

    const averageVotingMembers = votingMembers / elections;

    return {
      reportData: {
        activeBallots,
        inActiveBallots,
        societyUsers,
        averageVotingMembers,
      },
    };
  } catch (err) {
    throw new Error('Something went wrong with the report.');
  }
};
