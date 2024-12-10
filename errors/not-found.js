import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-error.js";

class NotFoundError extends CustomError {
  constructor(message) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export { NotFoundError };
