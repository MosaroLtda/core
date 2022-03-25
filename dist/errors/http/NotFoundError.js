"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const HttpError_1 = require("./HttpError");
class NotFoundError extends HttpError_1.HttpError {
    constructor(message, type) {
        super(message, 404, type);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
