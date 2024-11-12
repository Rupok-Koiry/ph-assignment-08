"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(statusCode, message, stack = '') {
        super(message);
        this.message = message;
        this.status = statusCode;
        this.isOperational = true;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor); // Capture stack trace only if stack is not provided
        }
    }
}
exports.default = AppError;
