import {
  countDistinct,
  gt,
  count,
  and,
  lte,
  gte,
  eq,
  lt,
  or,
} from 'drizzle-orm';
import { db } from '../db';
import { session, election, candidateVote, societyMember } from '../db/schema';
import { calculate } from '../helpers/log-helper';

export type Society = {
  societyId: number;
};

/**
 * Reports the number of active and inactive ballots, number of users per society, avgerage number of members voting in each election.
 */
export const society = async ({ societyId }: Society) => {
  try {
    const [activeBallots] = await db
      .select({ count: count() })
      .from(election)
      .where(
        and(
          eq(election.societyId, societyId),
          lte(election.startDate, new Date()),
          gte(election.endDate, new Date()),
        ),
      );

    const [inActiveBallots] = await db
      .select({ count: count() })
      .from(election)
      .where(
        and(
          eq(election.societyId, societyId),
          or(
            gt(election.startDate, new Date()),
            lt(election.endDate, new Date()),
          ),
        ),
      );

    const [societyUsers] = await db
      .select({ count: count() })
      .from(societyMember)
      .where(eq(societyMember.societyId, societyId));

    const [votingMembers] = await db
      .select({ count: countDistinct(candidateVote.memberId) })
      .from(candidateVote)
      .innerJoin(societyMember, eq(societyMember.societyId, societyId));

    const elections =
      (activeBallots?.count ?? 0) + (inActiveBallots?.count ?? 0);

    const averageVotingMembers = Math.ceil(
      (votingMembers?.count ?? 0) / elections,
    );

    return {
      reportData: {
        activeBallots: activeBallots?.count || 0,
        inActiveBallots: inActiveBallots?.count || 0,
        societyUsers: societyUsers?.count || 0,
        averageVotingMembers,
      },
    };
  } catch (err) {
    throw new Error('Something went wrong with the report.');
  }
};

/**
 * Reports the number of currently logged in users, number of active elections, avgerage query response time, avgerage http response time.
 */
export const system = async () => {
  try {
    const [loggedInUsers] = await db
      .select({ count: countDistinct(session.userId) })
      .from(session)
      .where(gt(session.expiresAt, new Date()));

    const [activeElections] = await db
      .select({ count: count() })
      .from(election)
      .where(
        and(
          lte(election.startDate, new Date()),
          gte(election.endDate, new Date()),
        ),
      );

    const { averageRequestTime, averageResponseTime } = await calculate();

    return {
      systemReportData: {
        loggedInUsers: loggedInUsers?.count || 0,
        activeElections: activeElections?.count || 0,
        averageRequestTime,
        averageResponseTime,
      },
    };
  } catch (err) {
    throw new Error('Something went wrong with the report.');
  }
};
