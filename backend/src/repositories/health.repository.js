import { pool } from '../config/database.js';

export async function checkDatabaseConnection() {
  await pool.query('SELECT 1');
}
