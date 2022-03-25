"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const HttpError_1 = require("./HttpError");
class BadRequestError extends HttpError_1.HttpError {
    constructor(message, type) {
        super(message, 400, type);
        this.name = 'BadRequestError';
    }
}
exports.BadRequestError = BadRequestError;
