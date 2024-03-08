/* eslint-disable no-console */
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env.development' });
require('dotenv').config({ path: '.env' });

const { migrate } = require('drizzle-orm/postgres-js/migrator');
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');

// eslint-disable-next-line no-process-env
const DATABASE_URL = process.env.DATABASE_URL;

const sql = postgres(DATABASE_URL, { max: 1 });
const db = drizzle(sql);

migrate(db, { migrationsFolder: 'lib/db/migrations' })
  .then(() => {
    console.log('Migrations complete!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error running migrations', err);
    process.exit(1);
  });
