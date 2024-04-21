import path from 'path';
require('dotenv').config({
  path: path.join(__dirname, '..', '..', '.env.local'),
});
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../db/schema';
import { PgSelect } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

const queryClient = postgres(
  process.env.DB_URL ||
    'postgresql://postgres:the_balkans123@localhost:5432/americandream',
);

export const db = drizzle(queryClient, { logger: !process.env.TEST, schema });

export const getOffset = (pageNumber: number, pageSize: number) => {
  return pageNumber * pageSize - pageSize;
};

export type PaginationResult<T> = {
  totalCount: number;
  data: T[];
  currentPage: number;
  nextPage?: number;
  hasMore: boolean;
};

export const withPagination = async <T extends PgSelect>(
  query: T,
  pageNumber: number = 1,
  pageSize: number = 15,
): Promise<PaginationResult<Awaited<T>>> => {
  const offset = getOffset(pageNumber, pageSize);
  const countQuery = db.execute<{ count: number }>(
    sql`SELECT count(*)::integer FROM (${query}) as total_count`,
  );

  const resultsQuery = await query.offset(offset).limit(pageSize);

  const [results, countResult] = await Promise.all([resultsQuery, countQuery]);

  const totalCount = countResult?.[0]?.count || 0;
  const hasMore = totalCount > offset + results.length;
  const nextPage = hasMore ? pageNumber + 1 : undefined;

  return {
    totalCount,
    data: results as Awaited<T>[],
    currentPage: pageNumber,
    nextPage,
    hasMore,
  };
};
