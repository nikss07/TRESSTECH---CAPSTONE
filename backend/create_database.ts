import { Client } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL must be set to create the database.');
}

const targetUrl = new URL(connectionString);
const databaseName =
  process.env.DB_NAME || decodeURIComponent(targetUrl.pathname.slice(1));
if (!databaseName) {
  throw new Error('DATABASE_URL must include a target database name.');
}

const adminUrl = new URL(connectionString);
adminUrl.pathname = '/postgres';

const client = new Client({ connectionString: adminUrl.toString() });

try {
  await client.connect();

  const existingDatabase = await client.query(
    'SELECT 1 FROM pg_database WHERE datname = $1',
    [databaseName],
  );

  if (existingDatabase.rowCount) {
    console.log(`Database "${databaseName}" already exists.`);
  } else {
    const quotedDatabaseName = `"${databaseName.replace(/"/g, '""')}"`;
    await client.query(`CREATE DATABASE ${quotedDatabaseName}`);
    console.log(`Created database "${databaseName}".`);
  }
} finally {
  await client.end();
}