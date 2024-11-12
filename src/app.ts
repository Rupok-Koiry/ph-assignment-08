import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import { PrismaClient } from "@prisma/client";
import errorHandler from "./app/middlewares/errorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import catchAsync from "./app/utils/catchAsync";
import httpStatus from "http-status";
import AppError from "./app/errors/AppError";
const prisma = new PrismaClient();

const app: Application = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for enabling Cross-Origin Resource Sharing (CORS) for specified origins
app.use(cors());

// Route handlers for API endpoints prefixed with /api/v1
app.use("/api", router);
app.post(
  "/api/return",
  catchAsync(async (req, res, next) => {
    const { borrowId } = req.body;

    // Step 1: Find the borrow record
    const borrowRecord = await prisma.borrowRecord.findUnique({
      where: { borrowId },
    });

    // Step 2: Check if borrow record exists and is not already returned
    if (!borrowRecord) {
      return next(
        new AppError(httpStatus.NOT_FOUND, "Borrow record not found")
      );
    }
    if (borrowRecord.returnDate) {
      return next(
        new AppError(httpStatus.BAD_REQUEST, "Book is already returned")
      );
    }

    // Step 3: Update the borrow record with the return date
    await prisma.borrowRecord.update({
      where: { borrowId },
      data: { returnDate: new Date() },
    });

    // Step 4: Send response
    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: "Book returned successfully",
    });
  })
);
// // Middleware for handling global errors
app.use(errorHandler);

// // Middleware for handling 404 - Not Found errors
app.use(notFound);
export default app;
