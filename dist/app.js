"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const errorHandler_1 = __importDefault(require("./app/middlewares/errorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const catchAsync_1 = __importDefault(require("./app/utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("./app/errors/AppError"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
// Middleware for parsing JSON bodies
app.use(express_1.default.json());
// Middleware for parsing cookies
app.use((0, cookie_parser_1.default)());
// Middleware for enabling Cross-Origin Resource Sharing (CORS) for specified origins
app.use((0, cors_1.default)());
// Route handlers for API endpoints prefixed with /api/v1
app.use("/api", routes_1.default);
app.post("/api/return", (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { borrowId } = req.body;
    // Step 1: Find the borrow record
    const borrowRecord = yield prisma.borrowRecord.findUnique({
        where: { borrowId },
    });
    // Step 2: Check if borrow record exists and is not already returned
    if (!borrowRecord) {
        return next(new AppError_1.default(http_status_1.default.NOT_FOUND, "Borrow record not found"));
    }
    if (borrowRecord.returnDate) {
        return next(new AppError_1.default(http_status_1.default.BAD_REQUEST, "Book is already returned"));
    }
    // Step 3: Update the borrow record with the return date
    yield prisma.borrowRecord.update({
        where: { borrowId },
        data: { returnDate: new Date() },
    });
    // Step 4: Send response
    res.status(http_status_1.default.OK).json({
        success: true,
        status: http_status_1.default.OK,
        message: "Book returned successfully",
    });
})));
// // Middleware for handling global errors
app.use(errorHandler_1.default);
// // Middleware for handling 404 - Not Found errors
app.use(notFound_1.default);
exports.default = app;
