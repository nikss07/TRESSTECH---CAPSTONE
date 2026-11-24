import { NotFoundError } from '../utils/error.js';

export function notFoundHandler(request, _response, next) {
  next(new NotFoundError(`No route found for ${request.method} ${request.originalUrl}.`));
}
