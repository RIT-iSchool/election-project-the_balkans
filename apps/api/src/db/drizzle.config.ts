import type { Config } from 'drizzle-kit';

export default {
  schema: 'src/db/schema.ts',
  out: 'src/db/migrations',
  dbCredentials: {
    connectionString: process.env.DB_URL || 'postgresql://postgres:the_balkans123@localhost:5432/americandream'
  },
} satisfies Config;
