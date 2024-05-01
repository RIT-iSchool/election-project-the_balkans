import { eq, sql } from 'drizzle-orm';
import { db } from '../db';
import {
  election,
  candidateVote,
  societyMember,
  electionOffice,
  electionCandidate,
  society,
  user,
  officeResultsView,
  initiativeResultsView,
  activeElectionsView,
  loggedInUsersView,
  activeBallotsView,
  inactiveBallotsView,
  societyUsersView,
  totalVotesView,
} from '../db/schema';
import { calculate } from '../helpers/log-helper';

export type Society = {
  societyId: number;
};

/**
 * Reports the number of active and inactive ballots, number of users per society, avgerage number of members voting in each election.
 */
export const societyReport = async ({ societyId }: Society) => {
  try {
    await Promise.all([
      db.refreshMaterializedView(activeBallotsView),
      db.refreshMaterializedView(inactiveBallotsView),
      db.refreshMaterializedView(societyUsersView),
    ]);

    const [
      [activeBallots],
      [inActiveBallots],
      [societyUsers],
      [votingMembers],
    ] = await Promise.all([
      db.execute<{
        count: number;
      }>(sql`SELECT count from activeBallotsFunction(${societyId})`),
      db.execute<{
        count: number;
      }>(sql`SELECT count from inactiveBallotsFunction(${societyId})`),
      db.execute<{
        count: number;
      }>(sql`SELECT count from societyUsersFunction(${societyId})`),
      db.execute<{
        count: number;
      }>(sql`SELECT count from votingMembersFunction(${societyId})`),
    ]);

    const elections =
      (activeBallots?.count ?? 0) + (inActiveBallots?.count ?? 0);

    const averageVotingMembers = Math.ceil(
      (votingMembers?.count ?? 0) / elections,
    );

    return {
      activeBallots: activeBallots?.count || 0,
      inActiveBallots: inActiveBallots?.count || 0,
      societyUsers: societyUsers?.count || 0,
      averageVotingMembers,
    };
  } catch (err) {
    throw new Error('Something went wrong with the report.');
  }
};

/**
 * Reports the number of currently logged in users, number of active elections, avgerage query response time, avgerage http response time.
 */
export const systemReport = async () => {
  try {
    await Promise.all([
      db.refreshMaterializedView(loggedInUsersView),
      db.refreshMaterializedView(activeElectionsView),
    ]);

    const [
      [loggedInUsers],
      [activeElections],
      { averageRequestTime, averageResponseTime },
    ] = await Promise.all([
      db.execute<{
        count: number;
      }>(sql`SELECT count from loggedInUsersFunction()`),
      db.execute<{
        count: number;
      }>(sql`SELECT count from activeElectionsFunction()`),
      calculate(),
    ]);

    return {
      loggedInUsers: loggedInUsers?.count || 0,
      activeElections: activeElections?.count || 0,
      averageRequestTime,
      averageResponseTime,
    };
  } catch (err) {
    throw new Error('Something went wrong with the report.');
  }
};

export type Status = {
  electionId: number;
};

/**
 * View Current Election Status
 */
export const statusReport = async ({ electionId }: Status) => {
  try {
    await Promise.all([db.refreshMaterializedView(totalVotesView)]);

    const [[totalVotes], votingMembers, members] = await Promise.all([
      db.execute<{
        count: number;
      }>(sql`SELECT count from totalVotesFunction(${electionId})`),
      db
        .selectDistinctOn([user.id], {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        })
        .from(user)
        .innerJoin(societyMember, eq(societyMember.userId, user.id))
        .innerJoin(society, eq(society.id, societyMember.societyId))
        .innerJoin(election, eq(election.societyId, society.id))
        .innerJoin(electionOffice, eq(electionOffice.electionId, election.id))
        .innerJoin(
          electionCandidate,
          eq(electionCandidate.electionOfficeId, electionOffice.id),
        )
        .innerJoin(
          candidateVote,
          eq(candidateVote.electionCandidateId, electionCandidate.id),
        )
        .where(eq(election.id, electionId)),
      db
        .selectDistinctOn([user.id], {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        })
        .from(user)
        .innerJoin(societyMember, eq(societyMember.userId, user.id))
        .innerJoin(society, eq(society.id, societyMember.societyId))
        .innerJoin(election, eq(election.societyId, society.id))
        .where(eq(election.id, electionId)),
    ]);

    const nonVotingMembers = members.filter(
      (member) =>
        !votingMembers.some((votingMember) => votingMember.id === member.id),
    );

    const totalMembers =
      (votingMembers?.length ?? 0) + (nonVotingMembers?.length ?? 0);

    const votingMemberPercentage = Math.ceil(
      ((votingMembers?.length ?? 0) / totalMembers) * 100,
    );

    return {
      totalVotes: totalVotes?.count || 0,
      votingMembers,
      nonVotingMembers,
      votingMemberPercentage,
    };
  } catch (err) {
    throw new Error('Something went wrong with the report.');
  }
};

export type Results = {
  electionId: number;
};

/**
 * View Finished Election Results
 */
export const resultsReport = async ({ electionId }: Results) => {
  try {
    await Promise.all([
      db.refreshMaterializedView(officeResultsView),
      db.refreshMaterializedView(initiativeResultsView),
    ]);

    const [[officeResults], [initiativeResults]] = await Promise.all([
      db.execute<{
        candidate: {
          name: string;
          office: string;
          voteCount: number;
        };
      }>(sql`SELECT candidate from officeResultsFunction(${electionId})`),
      db.execute<{
        option: {
          title: string;
          initiative: string;
          voteCount: number;
        };
      }>(sql`SELECT option from initiativeResultsFunction(${electionId})`),
    ]);

    return {
      officeResults,
      initiativeResults,
    };
  } catch (err) {
    console.error(err);
    throw new Error('Something went wrong with the report.');
  }
};
