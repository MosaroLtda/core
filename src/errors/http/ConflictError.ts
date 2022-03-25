import { HttpError } from './HttpError';

export class ConflictError extends HttpError {
  constructor(message: string, type?: string) {
    super(message, 409, type);
    this.name = 'ConflictError';
  }
}
