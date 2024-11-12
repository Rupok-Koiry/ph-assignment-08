import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import * as factory from "../../utils/handlerFactory";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBorrowRecord = factory.getOne("borrowRecord");
export const getAllBorrowRecords = factory.getAll("borrowRecord");
export const updateBorrowRecord = factory.updateOne("borrowRecord");
export const createBorrowRecord = factory.createOne("borrowRecord");
export const deleteBorrowRecord = factory.deleteOne("borrowRecord");

export const overdueBorrowList = catchAsync(async (req, res, next) => {
  const currentDate = new Date();

  // Step 1: Subtract 14 days from current date using setDate() for accurate date calculation
  const dueDate = new Date(currentDate);
  dueDate.setDate(currentDate.getDate() - 14); // Subtract 14 days

  // Step 2: Find all borrow records that have not been returned and are overdue
  const overdueRecords = await prisma.borrowRecord.findMany({
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
    return res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: "No overdue books",
      data: [],
    });
  }

  // Step 4: Map the overdue records to the required response format
  const overdueBooks = overdueRecords.map((record) => ({
    borrowId: record.borrowId,
    bookTitle: record.book.title,
    borrowerName: record.member.name,
    overdueDays: Math.floor(
      (currentDate.getTime() - record.borrowDate.getTime()) / (1000 * 3600 * 24)
    ), // Calculate overdue days
  }));

  // Step 5: Send response with overdue books data
  res.status(httpStatus.OK).json({
    success: true,
    status: httpStatus.OK,
    message: "Overdue borrow list fetched",
    data: overdueBooks,
  });
});
