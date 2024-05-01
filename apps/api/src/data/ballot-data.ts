import { db } from '../db';
import { and, eq } from 'drizzle-orm';
import {
  candidateVote,
  CreateCandidateVote,
  CreateElectionCandidate,
  CreateInitiativeVote,
  election,
  initiativeVote,
} from '../db/schema';

export type Submit = {
  ballotSubmitData: {
    candidateVotesData: CreateCandidateVote[];
    initiativeVotesData: CreateInitiativeVote[];
    electionId: number;
    societyId: number;
    writeIn?: CreateElectionCandidate;
  };
};

/**
 * Submit a ballot
 */
export const submit = async ({ ballotSubmitData }: Submit) => {
  try {
    await db.transaction(async (dbClient) => {
      await dbClient
        .insert(candidateVote)
        .values(ballotSubmitData.candidateVotesData);
      await dbClient
        .insert(initiativeVote)
        .values(ballotSubmitData.initiativeVotesData);
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
