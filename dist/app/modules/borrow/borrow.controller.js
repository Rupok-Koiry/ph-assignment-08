"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.overdueBorrowList = exports.deleteBorrowRecord = exports.createBorrowRecord = exports.updateBorrowRecord = exports.getAllBorrowRecords = exports.getBorrowRecord = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const factory = __importStar(require("../../utils/handlerFactory"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.getBorrowRecord = factory.getOne("borrowRecord");
exports.getAllBorrowRecords = factory.getAll("borrowRecord");
exports.updateBorrowRecord = factory.updateOne("borrowRecord");
exports.createBorrowRecord = factory.createOne("borrowRecord");
exports.deleteBorrowRecord = factory.deleteOne("borrowRecord");
exports.overdueBorrowList = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    // Step 1: Subtract 14 days from current date using setDate() for accurate date calculation
    const dueDate = new Date(currentDate);
    dueDate.setDate(currentDate.getDate() - 14); // Subtract 14 days
    // Step 2: Find all borrow records that have not been returned and are overdue
    const overdueRecords = yield prisma.borrowRecord.findMany({
        where: {
            returnDate: null, // Book not yet returned
            borrowDate: {
                lt: dueDate, // More than 14 days ago
            },
        },
        include: {
            book: true, // Include book details (title)
            member: true, // Include member details (borrower name)
        },
    });
    // Step 3: If there are no overdue records
    if (overdueRecords.length === 0) {
        return res.status(http_status_1.default.OK).json({
            success: true,
            status: http_status_1.default.OK,
            message: "No overdue books",
            data: [],
        });
    }
    // Step 4: Map the overdue records to the required response format
    const overdueBooks = overdueRecords.map((record) => ({
        borrowId: record.borrowId,
        bookTitle: record.book.title,
        borrowerName: record.member.name,
        overdueDays: Math.floor((currentDate.getTime() - record.borrowDate.getTime()) / (1000 * 3600 * 24)), // Calculate overdue days
    }));
    // Step 5: Send response with overdue books data
    res.status(http_status_1.default.OK).json({
        success: true,
        status: http_status_1.default.OK,
        message: "Overdue borrow list fetched",
        data: overdueBooks,
    });
}));
