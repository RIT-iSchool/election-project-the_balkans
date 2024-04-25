import { CreateCandidateVote } from '../db/schema';
import { db } from '../db';
import {
  candidateVote,
  electionCandidate,
  electionOffice,
  election,
} from '../db/schema';
import { and, eq, getTableColumns } from 'drizzle-orm';

export type Create = {
  candidateVoteData: CreateCandidateVote;
};

/**
 * Creates a new entry in the candidate vote table.
 */
export const create = async ({ candidateVoteData }: Create) => {
  try {
    const [newCandidateVote] = await db.transaction(
      async (dbClient) =>
        await dbClient
          .insert(candidateVote)
          .values(candidateVoteData)
          .returning(),
    );
    return newCandidateVote!;
  } catch (err) {
    throw new Error('Something went wrong creating a candidate vote.');
  }
};

export type List = {
  electionId: number;
  societyId: number;
};

/**
 * Lists a society's election's candidate votes.
 */
export const list = async ({ electionId, societyId }: List) => {
  try {
    const candidateVoteData = await db
      .select({
        ...getTableColumns(candidateVote),
      })
      .from(candidateVote)
      .innerJoin(
        electionCandidate,
        eq(candidateVote.electionCandidateId, electionCandidate.id),
      )
      .innerJoin(
        electionOffice,
        eq(electionCandidate.electionOfficeId, electionOffice.id),
      )
      .innerJoin(election, eq(electionOffice.electionId, election.id))
      .where(
        and(eq(election.id, electionId), eq(election.societyId, societyId)),
      );
    return candidateVoteData!;
  } catch (err) {
    throw new Error('Something went wrong listing election candidate votes.');
  }
};

export type Retrieve = {
  electionId: number;
  memberId: number;
};

/**
 * Retrieves a candidate vote.
 */
export const retrieve = async ({ electionId, memberId }: Retrieve) => {
  try {
    const [candidateVoteData] = await db
      .select({
        ...getTableColumns(candidateVote),
      })
      .from(candidateVote)
      .innerJoin(
        electionCandidate,
        eq(candidateVote.electionCandidateId, electionCandidate.id),
      )
      .innerJoin(
        electionOffice,
        eq(electionCandidate.electionOfficeId, electionOffice.id),
      )
      .innerJoin(election, eq(electionOffice.electionId, election.id))
      .where(
        and(eq(election.id, electionId), eq(candidateVote.memberId, memberId)),
      );
    return candidateVoteData || null;
  } catch (err) {
    throw new Error('Something went wrong retrieving a candidate vote.');
  }
};
