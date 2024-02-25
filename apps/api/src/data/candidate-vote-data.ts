import { CreateCandidateVote } from '../db/schema';
import { db } from '../db';
import {
  candidateVote,
  electionCandidate,
  electionOffice,
  election,
} from '../db/schema';
import { and, eq } from 'drizzle-orm';

export type Create = {
  candidateVoteData: CreateCandidateVote;
};

/**
 * Creates a new entry in the candidate vote table.
 */
export const create = async ({ candidateVoteData }: Create) => {
  try {
    const [newCandidateVote] = await db
      .insert(candidateVote)
      .values(candidateVoteData)
      .returning();
    return newCandidateVote!;
  } catch (err) {
    throw new Error('Something went wrong creating a candidate vote.');
  }
};

export type Retrieve = {
  electionId: number;
  societyId: number;
};

/**
 * Retrieves all of a society's election's candidate votes.
 */
export const retrieve = async ({ electionId, societyId }: Retrieve) => {
  try {
    const [candidateVoteData] = await db
      .select()
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
    throw new Error(
      'Something went wrong retrieving election candidate votes.',
    );
  }
};
