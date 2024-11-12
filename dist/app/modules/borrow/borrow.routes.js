"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowRecordRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_controller_1 = require("./borrow.controller");
const router = express_1.default.Router();
router.route("/").get(borrow_controller_1.getAllBorrowRecords).post(borrow_controller_1.createBorrowRecord);
router.route("/overdue").get(borrow_controller_1.overdueBorrowList);
router
    .route("/:id")
    .get(borrow_controller_1.getBorrowRecord)
    .put(borrow_controller_1.updateBorrowRecord)
    .delete(borrow_controller_1.deleteBorrowRecord);
exports.BorrowRecordRoutes = router;
