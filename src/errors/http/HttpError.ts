export class HttpError extends Error {
  constructor(message: string, public readonly statusCode = 400, public readonly type?: string) {
    super(message);
    this.name = 'HttpError';
  }
}
