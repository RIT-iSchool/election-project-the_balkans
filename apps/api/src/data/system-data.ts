import { and, lte, gte, count } from 'drizzle-orm';
import { db } from '../db';
import { election, session } from '../db/schema';

/**
 * Reports the number of currently logged in users, number of active elections, avgerage query response time, avgerage http response time.
 */
export const report = async () => {
  try {
    const loggedInUsers =
      (await db.select({ count: count() }).from(session)).pop()?.count ?? 0;

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

    //TODO:
    const averageQueryTime = 1;

    //TODO:
    const averageHttpResponseTime = 1;

    return {
      systemReportData: {
        loggedInUsers,
        activeElections,
        averageQueryTime,
        averageHttpResponseTime,
      },
    };
  } catch (err) {
    throw new Error('Something went wrong with the report.');
  }
};
