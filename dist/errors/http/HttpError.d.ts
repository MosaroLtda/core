export declare class HttpError extends Error {
    readonly statusCode: number;
    readonly type?: string;
    constructor(message: string, statusCode?: number, type?: string);
}
