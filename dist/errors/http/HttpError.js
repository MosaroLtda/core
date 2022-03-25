"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(message, statusCode = 400, type) {
        super(message);
        this.statusCode = statusCode;
        this.type = type;
        this.name = 'HttpError';
    }
}
exports.HttpError = HttpError;
