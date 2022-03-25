"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
const HttpError_1 = require("./HttpError");
class ConflictError extends HttpError_1.HttpError {
    constructor(message, type) {
        super(message, 409, type);
        this.name = 'ConflictError';
    }
}
exports.ConflictError = ConflictError;
