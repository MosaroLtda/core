import { HttpError } from './HttpError';
export declare class NotFoundError extends HttpError {
    constructor(message: string, type?: string);
}
