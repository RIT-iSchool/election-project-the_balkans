import { db } from '../db';
import { and, eq } from 'drizzle-orm';
import {
  candidateVote,
  CreateCandidateVote,
  CreateInitiativeVote,
  election,
  initiativeVote,
} from '../db/schema';

export type Submit = {
  candidateVotesData: CreateCandidateVote[];
  initiativeVotesData: CreateInitiativeVote[];
  electionId: number;
  societyId: number;
};

/**
 * Submit a ballot
 */
export const submit = async ({
  candidateVotesData,
  initiativeVotesData,
}: Submit) => {
  try {
    await db.transaction(async (dbClient) => {
      candidateVotesData.forEach(async (candidateVoteData) => {
        await dbClient.insert(candidateVote).values(candidateVoteData);
      });
      initiativeVotesData.forEach(async (initiativeVoteData) => {
        await dbClient.insert(initiativeVote).values(initiativeVoteData);
      });
    });
  } catch (err) {
    throw new Error('Something went wrong submitting a ballot');
  }
};

export type Retrieve = {
  electionId: number;
  societyId: number;
};

/**
 * Retrieve a ballot
 */
export const retrieve = async ({ electionId, societyId }: Retrieve) => {
  try {
    const ballotData = await db.query.election.findFirst({
      where: and(
        eq(election.id, electionId),
        eq(election.societyId, societyId),
      ),
      with: {
        offices: {
          with: {
            candidates: true,
          },
        },
        initiatives: {
          with: {
            options: true,
          },
        },
      },
    });

    return ballotData;
  } catch (err) {
    throw new Error('Something went wrong retrieving a ballot');
  }
};
