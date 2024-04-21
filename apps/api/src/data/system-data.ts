import { and, lte, gte, count, gt, countDistinct } from 'drizzle-orm';
import { db } from '../db';
import { election, session } from '../db/schema';
import { calculate } from '../helpers/log-helper';

/**
 * Reports the number of currently logged in users, number of active elections, avgerage query response time, avgerage http response time.
 */
export const report = async () => {
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
