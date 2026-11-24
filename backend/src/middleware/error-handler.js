import { HttpError } from '../utils/error.js';

export function errorHandler(error, _request, response, next) {
  if (response.headersSent) {
    next(error);
    return;
  }

  const isHttpError = error instanceof HttpError;
  const statusCode = isHttpError ? error.statusCode : 500;

  if (statusCode >= 500) {
    console.error(error);
  }

  const responseBody = {
    error: statusCode >= 500 ? 'Internal server error.' : error.message,
    code: isHttpError ? error.code : 'INTERNAL_SERVER_ERROR',
  };

  if (isHttpError && statusCode < 500 && error.details !== undefined) {
    responseBody.details = error.details;
  }

  response.status(statusCode).json(responseBody);
}
