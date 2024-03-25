import type { Config } from 'drizzle-kit';

export default {
  schema: 'src/db/schema.ts',
  out: 'src/db/migrations',
  dbCredentials: {
    connectionString: 'postgresql://localhost:5432/balkans',
  },
} satisfies Config;
