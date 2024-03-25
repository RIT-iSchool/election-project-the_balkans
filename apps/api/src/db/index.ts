import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const queryClient = postgres('postgresql://localhost:5432/americandream');
export const db = drizzle(queryClient, { logger: true });
