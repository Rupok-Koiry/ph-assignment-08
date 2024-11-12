import express from "express";
import {
  createBorrowRecord,
  deleteBorrowRecord,
  getAllBorrowRecords,
  getBorrowRecord,
  updateBorrowRecord,
  overdueBorrowList,
} from "./borrow.controller";

const router = express.Router();

router.route("/").get(getAllBorrowRecords).post(createBorrowRecord);
router.route("/overdue").get(overdueBorrowList);
router
  .route("/:id")
  .get(getBorrowRecord)
  .put(updateBorrowRecord)
  .delete(deleteBorrowRecord);

export const BorrowRecordRoutes = router;
