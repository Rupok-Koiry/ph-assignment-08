"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.status
        ? err.status
        : http_status_1.default.INTERNAL_SERVER_ERROR;
    let message = "Something went wrong!";
    // Handle Prisma validation error
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        statusCode = http_status_1.default.BAD_REQUEST;
        message = "Validation Error";
    }
    // Handle Prisma known request errors
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                statusCode = http_status_1.default.CONFLICT;
                message = "Duplicate Key Error";
                break;
            case "P2025":
                statusCode = http_status_1.default.NOT_FOUND;
                message = "Record not found";
                break;
            case "P2003":
                statusCode = http_status_1.default.BAD_REQUEST;
                message = "Foreign key constraint error";
                break;
            default:
                message = "Database error";
                break;
        }
    }
    // Handle generic errors
    else if (err instanceof Error) {
        message = err.message;
    }
    // Prepare response JSON, including errorDetails only in development
    const response = {
        success: false,
        status: statusCode,
        message,
    };
    res.status(statusCode).json(response);
};
exports.default = globalErrorHandler;
