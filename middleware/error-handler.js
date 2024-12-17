import { StatusCodes } from "http-status-codes";
import { Result } from "../utils/Result.js";

const errorHandlerMiddleware = async (err, req, res, next) => {
  const error = { message: err.message, details: err.errors };
  if (err.name === "ValidationError") {
    const statusCode = err.statusCode || StatusCodes.BAD_REQUEST;
    const result = Result.failure(error);
    return res.status(statusCode).json(result);
  }

  const result = Result.failure(error);

  return res
    .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(result);
};

export { errorHandlerMiddleware };
