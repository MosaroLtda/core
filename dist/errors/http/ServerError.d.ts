import { HttpError } from './HttpError';
export declare class ServerError extends HttpError {
    constructor(message: string, type?: string);
}
