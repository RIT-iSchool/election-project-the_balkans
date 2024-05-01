import { CreateElectionCandidate, UpdateElectionCandidate } from '../db/schema';
import { db } from '../db';
import { electionCandidate, electionOffice, election } from '../db/schema';
import { and, eq, getTableColumns, ilike } from 'drizzle-orm';

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
    throw new Error('Something went wrong creating an election candidate');
  }
};

export type List = {
  electionId: number;
  officeId?: number;
  societyId: number;
};

/**
 * Lists a society's election's candidates.
 */
export const list = async ({ electionId, officeId, societyId }: List) => {
  try {
    const electionCandidateQuery = db
      .select({
        ...getTableColumns(electionCandidate),
      })
      .from(electionCandidate)
      .innerJoin(
        electionOffice,
        eq(electionCandidate.electionOfficeId, electionOffice.id),
      )
      .innerJoin(election, eq(electionOffice.electionId, election.id))
      .$dynamic();

    if (officeId) {
      electionCandidateQuery.where(
        and(
          eq(election.societyId, societyId),
          eq(election.id, electionId),
          eq(electionOffice.id, officeId),
          eq(electionCandidate.writeIn, false),
        ),
      );
    } else {
      electionCandidateQuery.where(
        and(
          eq(election.id, electionId),
          eq(election.societyId, societyId),
          eq(electionCandidate.writeIn, false),
        ),
      );
    }

    return await electionCandidateQuery;
  } catch (err) {
    throw new Error('Something went wrong listing election candidates.');
  }
};

export type Lookup = {
  name: string;
  officeId: number;
};

/**
 * Lookup a candidate.
 */
export const lookup = async ({ name, officeId }: Lookup) => {
  try {
    const electionCandidateData = await db.query.electionCandidate.findFirst({
      where: and(
        ilike(electionCandidate.name, name),
        eq(electionCandidate.electionOfficeId, officeId),
      ),
    });
    return electionCandidateData;
  } catch (err) {
    throw new Error('Something went wrong retrieving election candidate.');
  }
};

export type Retrieve = {
  electionCandidateId: number;
  electionId: number;
  officeId: number;
  societyId: number;
};

/**
 * Retrieves an election candidate by ID
 */
export const retrieve = async ({
  officeId,
  electionCandidateId,
  societyId,
}: Retrieve) => {
  try {
    const [electionCandidateData] = await db
      .select({
        ...getTableColumns(electionCandidate),
      })
      .from(electionCandidate)
      .where(
        and(
          eq(electionCandidate.id, electionCandidateId),
          eq(electionCandidate.electionOfficeId, officeId),
          eq(electionCandidate.societyId, societyId),
        ),
      );
    return electionCandidateData;
  } catch (err) {
    throw new Error('Something went wrong retrieving election candidate.');
  }
};

export type Update = {
  electionCandidateId: number;
  electionCandidateData: UpdateElectionCandidate;
  societyId: number;
  officeId: number;
};

/**
 * Updates an election candidate by ID
 */
export const update = async ({
  electionCandidateId,
  electionCandidateData,
  societyId,
  officeId,
}: Update) => {
  try {
    const [updatedElectionCandidate] = await db.transaction(
      async (dbClient) =>
        await dbClient
          .update(electionCandidate)
          .set(electionCandidateData)
          .where(
            and(
              eq(electionCandidate.id, electionCandidateId),
              eq(electionCandidate.societyId, societyId),
              eq(electionCandidate.electionOfficeId, officeId),
            ),
          )
          .returning(),
    );
    return updatedElectionCandidate!;
  } catch (err) {
    throw new Error('Something went wrong updating election candidate.');
  }
};

export type Remove = {
  candidateId: number;
  officeId: number;
  societyId: number;
};

/**
 * Removes an election candidate by ID
 */
export const remove = async ({ candidateId, officeId, societyId }: Remove) => {
  try {
    await db.transaction(
      async (dbClient) =>
        await dbClient
          .delete(electionCandidate)
          .where(
            and(
              eq(electionCandidate.id, candidateId),
              eq(electionCandidate.electionOfficeId, officeId),
              eq(electionCandidate.societyId, societyId),
            ),
          ),
    );
  } catch (err) {
    throw new Error('Something went wrong removing election candidate.');
  }
};
