import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "./book.controller";

const router = express.Router();

router.route("/").get(getAllBooks).post(createBook);
router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);

export const BookRoutes = router;
