import { StatusCodes } from "http-status-codes";
import { ErrorCode } from "../utils/ErrorCode.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OperationResult } from "../utils/OperationResult.js";

const errorHandlerMiddleware = async (err, req, res, next) => {
  const error = { message: err.message, details: err.errors };
  if (err.name === "ValidationError") {
    const statusCode = err.statusCode || StatusCodes.BAD_REQUEST;

    const operationResult = await OperationResult.Failure(
      ErrorCode.ValidationError,
      err.message,
      err.errors
    );

    const apiResponse = await ApiResponse.ToApiResponse(operationResult);

    return res.status(statusCode).json(apiResponse);
  }

  const operationResult = await OperationResult.Failure(
    ErrorCode.InternalServerError,
    err.message,
    err.errors
  );

  const apiResponse = await ApiResponse.ToApiResponse(operationResult);

  return res
    .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(apiResponse);
};

export { errorHandlerMiddleware };
