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
exports.getAll = exports.getOne = exports.createOne = exports.updateOne = exports.deleteOne = void 0;
const client_1 = require("@prisma/client");
const catchAsync_1 = __importDefault(require("./catchAsync"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma = new client_1.PrismaClient();
// Capitalizes the first character of a string
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
// Helper function to get primary key field based on model name
const getPrimaryKeyField = (modelName) => {
    switch (modelName) {
        case "book":
            return "bookId";
        case "member":
            return "memberId";
        case "borrowRecord":
            return "borrowId";
        default:
            throw new Error("Invalid model name");
    }
};
const deleteOne = (modelName) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const primaryKey = getPrimaryKeyField(modelName);
    const doc = yield prisma[modelName].delete({
        where: { [primaryKey]: req.params.id },
    });
    if (!doc) {
        return next(new AppError_1.default(http_status_1.default.NOT_FOUND, "No document found with that ID"));
    }
    res.status(http_status_1.default.OK).json({
        success: true,
        status: http_status_1.default.OK,
        message: `${capitalize(modelName)} deleted successfully`,
        data: doc,
    });
}));
exports.deleteOne = deleteOne;
const updateOne = (modelName) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const primaryKey = getPrimaryKeyField(modelName);
    const doc = yield prisma[modelName].update({
        where: { [primaryKey]: req.params.id },
        data: req.body,
    });
    if (!doc) {
        return next(new AppError_1.default(http_status_1.default.NOT_FOUND, `${capitalize(modelName)} not found`));
    }
    res.status(http_status_1.default.OK).json({
        success: true,
        status: http_status_1.default.OK,
        message: `${capitalize(modelName)} updated successfully`,
        data: doc,
    });
}));
exports.updateOne = updateOne;
const createOne = (modelName) => (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield prisma[modelName].create({
        data: req.body,
    });
    res.status(http_status_1.default.CREATED).json({
        success: true,
        status: http_status_1.default.CREATED,
        message: `${capitalize(modelName)} created successfully`,
        data: doc,
    });
}));
exports.createOne = createOne;
const getOne = (modelName) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const primaryKey = getPrimaryKeyField(modelName);
    const doc = yield prisma[modelName].findUnique({
        where: { [primaryKey]: req.params.id },
    });
    if (!doc) {
        return next(new AppError_1.default(http_status_1.default.NOT_FOUND, `${capitalize(modelName)} not found`));
    }
    res.status(http_status_1.default.OK).json({
        success: true,
        status: http_status_1.default.OK,
        message: `${capitalize(modelName)} retrieved successfully`,
        data: doc,
    });
}));
exports.getOne = getOne;
const getAll = (modelName) => (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docs = yield prisma[modelName].findMany();
    res.status(http_status_1.default.OK).json({
        success: true,
        status: http_status_1.default.OK,
        message: `${capitalize(modelName)}s retrieved successfully`,
        data: docs,
    });
}));
exports.getAll = getAll;
