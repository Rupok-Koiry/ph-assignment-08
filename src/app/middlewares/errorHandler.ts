import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = err.status
    ? err.status
    : httpStatus.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong!";

  // Handle Prisma validation error
  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Validation Error";
  }
  // Handle Prisma known request errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        statusCode = httpStatus.CONFLICT;
        message = "Duplicate Key Error";
        break;
      case "P2025":
        statusCode = httpStatus.NOT_FOUND;
        message = "Record not found";
        break;
      case "P2003":
        statusCode = httpStatus.BAD_REQUEST;
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

export default globalErrorHandler;
