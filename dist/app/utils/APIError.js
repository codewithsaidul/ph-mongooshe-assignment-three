"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APiError = void 0;
class APiError extends Error {
    constructor(statusCode, message, error = {}) {
        super(message);
        this.statusCode = statusCode,
            this.error = error;
    }
}
exports.APiError = APiError;
