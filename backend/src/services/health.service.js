import { checkDatabaseConnection } from '../repositories/health.repository.js';

export async function getHealthStatus() {
  await checkDatabaseConnection();

  return {
    status: 'ok',
    database: 'connected',
  };
}
