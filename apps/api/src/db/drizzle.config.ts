import type { Config } from 'drizzle-kit';

export default {
  schema: 'src/db/schema.ts',
  out: 'src/db/migrations',
  dbCredentials: {
    connectionString: 'postgresql://postgres:the_balkans123@localhost:5432/americandream',
  },
} satisfies Config;
