import { StatusCodes } from "http-status-codes";

export class ValidationError extends Error {
  constructor(message, errors, statusCode = StatusCodes.BAD_REQUEST) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
