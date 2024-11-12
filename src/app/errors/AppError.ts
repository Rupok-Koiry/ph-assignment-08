class AppError extends Error {
  public status: number; // HTTP status code associated with the error
  public isOperational: boolean; // Operational errors are known errors

  constructor(statusCode: number, message: string, stack = '') {
    super(message);

    this.message = message;
    this.status = statusCode;
    this.isOperational = true;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor); // Capture stack trace only if stack is not provided
    }
  }
}

export default AppError;
