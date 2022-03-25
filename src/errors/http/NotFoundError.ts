import { HttpError } from './HttpError';

export class NotFoundError extends HttpError {
  constructor(message: string, type?: string) {
    super(message, 404, type);
    this.name = 'NotFoundError';
  }
}
