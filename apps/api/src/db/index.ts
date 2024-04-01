require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env.local' )});
import path from 'path';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const queryClient = postgres(
  process.env.DB_URL || 'postgresql://postgres:the_balkans123@localhost:5432/americandream'
  );
export const db = drizzle(queryClient, { logger: true });
