import { CreateElectionCandidate } from '../db/schema';
import { db } from '../db';
import { electionCandidate, electionOffice, election } from '../db/schema';
import { and, eq } from 'drizzle-orm';

export type Create = {
  electionCandidateData: CreateElectionCandidate;
};

/**
 * Creates a new entry in the election candidate table.
 */
export const create = async ({ electionCandidateData }: Create) => {
  try {
    await db.transaction(async (dbClient) => {
      const [newElectionCandidate] = await dbClient
        .insert(electionCandidate)
        .values(electionCandidateData)
        .returning();
      return newElectionCandidate!;
    });
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
