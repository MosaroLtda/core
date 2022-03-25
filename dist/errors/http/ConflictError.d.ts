import { HttpError } from './HttpError';
export declare class ConflictError extends HttpError {
    constructor(message: string, type?: string);
}
