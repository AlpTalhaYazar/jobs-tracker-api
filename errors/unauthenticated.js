import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-error.js";

class UnauthenticatedError extends CustomError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export { UnauthenticatedError };
