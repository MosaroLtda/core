import { HttpError } from './HttpError';
export declare class UnauthorizedError extends HttpError {
    constructor(message: string, type?: string);
}
