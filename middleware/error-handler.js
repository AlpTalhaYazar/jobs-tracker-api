import { StatusCodes } from "http-status-codes";
import { Result } from "../utils/Result.js";

const errorHandlerMiddleware = async (err, req, res, next) => {
  const result = Result.failure(err.message);

  return res
    .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(result);
};

export { errorHandlerMiddleware };
