import type { Config } from 'drizzle-kit';

export default {
  schema: 'src/db/schema.ts',
  out: 'src/db/migrations',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
