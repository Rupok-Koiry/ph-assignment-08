"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.route("/").get(book_controller_1.getAllBooks).post(book_controller_1.createBook);
router.route("/:id").get(book_controller_1.getBook).put(book_controller_1.updateBook).delete(book_controller_1.deleteBook);
exports.BookRoutes = router;
