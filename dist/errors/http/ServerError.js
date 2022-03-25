"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
const HttpError_1 = require("./HttpError");
class ServerError extends HttpError_1.HttpError {
    constructor(message, type) {
        super(message, 500, type);
        this.name = 'ServerError';
    }
}
exports.ServerError = ServerError;
