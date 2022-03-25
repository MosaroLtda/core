import { HttpError } from './HttpError';

export class UnauthorizedError extends HttpError {
  constructor(message: string, type?: string) {
    super(message, 401, type);
    this.name = 'UnauthorizedError';
  }
}
