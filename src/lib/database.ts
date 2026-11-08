
import { Pool } from 'pg';

let io :any= null;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function getPool() {
  if (!io) {
    io = await pool.connect();
  }
  return io;
}

export { getPool };