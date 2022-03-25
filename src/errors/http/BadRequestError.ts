import { HttpError } from './HttpError';

export class BadRequestError extends HttpError {
  constructor(message: string, type?: string) {
    super(message, 400, type);
    this.name = 'BadRequestError';
  }
}
