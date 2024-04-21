import { CreateElectionCandidate, UpdateElectionCandidate } from '../db/schema';
import { db } from '../db';
import { electionCandidate, electionOffice, election } from '../db/schema';
import { and, eq, ilike } from 'drizzle-orm';

export type Create = {
  electionCandidateData: CreateElectionCandidate;
};

/**
 * Creates a new entry in the election candidate table.
 */
export const create = async ({ electionCandidateData }: Create) => {
  try {
    const [newElectionCandidate] = await db.transaction(
      async (dbClient) =>
        await dbClient
          .insert(electionCandidate)
          .values(electionCandidateData)
          .returning(),
    );
    return newElectionCandidate!;
  } catch (err) {
    throw new Error('Something went wrong creating an election ');
  }
};

export type List = {
  electionId: number;
  societyId: number;
};

/**
 * Lists a society's election's candidates.
 */
export const list = async ({ electionId, societyId }: List) => {
  try {
    const electionCandidateData = await db
      .select()
      .from(electionCandidate)
      .innerJoin(
        electionOffice,
        eq(electionCandidate.electionOfficeId, electionOffice.id),
      )
      .innerJoin(election, eq(electionOffice.electionId, election.id))
      .where(
        and(eq(election.id, electionId), eq(election.societyId, societyId)),
      );

    return electionCandidateData;
  } catch (err) {
    throw new Error('Something went wrong listing election candidates.');
  }
};

export type Lookup = {
  name: string;
};

/**
 * Lookup a candidate.
 */
export const lookup = async ({ name }: Lookup) => {
  try {
    const electionCandidateData = await db.query.electionCandidate.findFirst({
      where: and(ilike(electionCandidate.name, name)),
    });
    return electionCandidateData;
  } catch (err) {
    throw new Error('Something went wrong retrieving election candidate.');
  }
};

export type Retrieve = {
  electionCandidateId: number;
};

/**
 * Retrieves an election candidate by ID
 */
export const retrieve = async ({ electionCandidateId }: Retrieve) => {
  try {
    const electionCandidateData = await db
      .select()
      .from(electionCandidate)
      .where(eq(electionCandidate.id, electionCandidateId));
    return electionCandidateData;
  } catch (err) {
    throw new Error('Something went wrong retrieving election candidate.');
  }
};

export type Update = {
  electionCandidateId: number;
  electionCandidateData: UpdateElectionCandidate;
};

/**
 * Updates an election candidate by ID
 */
export const update = async ({
  electionCandidateId,
  electionCandidateData,
}: Update) => {
  try {
    const [updatedElectionCandidate] = await db.transaction(
      async (dbClient) =>
        await dbClient
          .update(electionCandidate)
          .set(electionCandidateData)
          .where(eq(electionCandidate.id, electionCandidateId))
          .returning(),
    );
    return updatedElectionCandidate!;
  } catch (err) {
    throw new Error('Something went wrong updating election candidate.');
  }
};
