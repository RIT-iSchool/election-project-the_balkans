/* eslint-disable no-console */
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env.development' });
require('dotenv').config({ path: '.env' });

const { migrate } = require('drizzle-orm/postgres-js/migrator');
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');

// eslint-disable-next-line no-process-env
const DATABASE_URL = process.env.DATABASE_URL;

console.log('Connecting to the database...');
const sql = postgres(DATABASE_URL, { max: 1 });
console.log('Connected to the database.');
const db = drizzle(sql);

migrate(db, { migrationsFolder: 'src/db/migrations' })
  .then(() => {
    console.log('Migrations complete!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error running migrations:', err.message);
    console.error('Error details:', err);

    if (err.query) {
      console.error('Failed migration SQL:', err.query);
    }

    if (err.response) {
      console.error('Error response:', err.response);
    }
    process.exit(1);
  });
