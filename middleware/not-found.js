import { StatusCodes } from "http-status-codes";
import { OperationResult } from "../utils/OperationResult.js";
import { ErrorCode } from "../utils/ErrorCode.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const notFoundMiddleware = async (req, res) => {
  const operationResult = await OperationResult.Failure(
    ErrorCode.NOT_FOUND,
    "Route does not exist",
    ["Route does not exist"]
  );

  const apiResponse = await ApiResponse.ToApiResponse(operationResult);

  return res.status(StatusCodes.NOT_FOUND).json(apiResponse);
};

export { notFoundMiddleware };
