"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noContent = exports.ok = void 0;
function ok(data, contentType, headers) {
    return {
        statusCode: 200,
        contentType,
        body: data,
        headers: headers,
    };
}
exports.ok = ok;
const noContent = () => ({
    statusCode: 204,
    body: null,
});
exports.noContent = noContent;
