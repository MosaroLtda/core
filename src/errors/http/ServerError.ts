import { HttpError } from './HttpError';

export class ServerError extends HttpError {
  constructor(message: string, type?: string) {
    super(message, 500, type);
    this.name = 'ServerError';
  }
}
