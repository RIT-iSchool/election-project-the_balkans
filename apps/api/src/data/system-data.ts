import { and, lte, gte, count, gt, countDistinct } from 'drizzle-orm';
import { db } from '../db';
import { election, session } from '../db/schema';
import { calculate } from '../helpers/log-helper';

/**
 * Reports the number of currently logged in users, number of active elections, avgerage query response time, avgerage http response time.
 */
export const report = async () => {
  try {
    const loggedInUsers =
      (
        await db
          .select({ count: countDistinct(session.userId) })
          .from(session)
          .where(gt(session.expiresAt, new Date()))
      ).pop()?.count ?? 0;

    const activeElections =
      (
        await db
          .select({ count: count() })
          .from(election)
          .where(
            and(
              lte(election.startDate, new Date()),
              gte(election.endDate, new Date()),
            ),
          )
      ).pop()?.count ?? 0;

    const averageRequestTime = (await calculate()).averageRequestTime;

    const averageResponseTime = (await calculate()).averageResponseTime;

    return {
      systemReportData: {
        loggedInUsers,
        activeElections,
        averageRequestTime,
        averageResponseTime,
      },
    };
  } catch (err) {
    throw new Error('Something went wrong with the report.');
  }
};
