export const HttpStatus = Object.freeze({
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
});

export class HttpError extends Error {
  constructor(statusCode, message, { code = 'HTTP_ERROR', details, cause } = {}) {
    super(message, { cause });

    if (!Number.isInteger(statusCode) || statusCode < 400 || statusCode > 599) {
      throw new RangeError('HTTP error statusCode must be between 400 and 599.');
    }

    this.name = new.target.name;
    this.statusCode = statusCode;
    this.code = code;

    if (details !== undefined) {
      this.details = details;
    }
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad request.', options = {}) {
    super(HttpStatus.BAD_REQUEST, message, { ...options, code: 'BAD_REQUEST' });
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Authentication is required.', options = {}) {
    super(HttpStatus.UNAUTHORIZED, message, {
      ...options,
      code: 'UNAUTHORIZED',
    });
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'You are not allowed to perform this action.', options = {}) {
    super(HttpStatus.FORBIDDEN, message, { ...options, code: 'FORBIDDEN' });
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Resource not found.', options = {}) {
    super(HttpStatus.NOT_FOUND, message, { ...options, code: 'NOT_FOUND' });
  }
}

export class ConflictError extends HttpError {
  constructor(message = 'The request conflicts with the current resource state.', options = {}) {
    super(HttpStatus.CONFLICT, message, { ...options, code: 'CONFLICT' });
  }
}

export class ValidationError extends HttpError {
  constructor(message = 'Request validation failed.', options = {}) {
    super(HttpStatus.UNPROCESSABLE_ENTITY, message, {
      ...options,
      code: 'VALIDATION_ERROR',
    });
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message = 'Too many requests.', options = {}) {
    super(HttpStatus.TOO_MANY_REQUESTS, message, {
      ...options,
      code: 'TOO_MANY_REQUESTS',
    });
  }
}

export class InternalServerError extends HttpError {
  constructor(message = 'An unexpected error occurred.', options = {}) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message, {
      ...options,
      code: 'INTERNAL_SERVER_ERROR',
    });
  }
}

export class ServiceUnavailableError extends HttpError {
  constructor(message = 'The service is temporarily unavailable.', options = {}) {
    super(HttpStatus.SERVICE_UNAVAILABLE, message, {
      ...options,
      code: 'SERVICE_UNAVAILABLE',
    });
  }
}