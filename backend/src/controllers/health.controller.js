import { getHealthStatus } from '../services/health.service.js';

export async function getHealth(_request, response) {
  const healthStatus = await getHealthStatus();
  response.status(200).json(healthStatus);
}
