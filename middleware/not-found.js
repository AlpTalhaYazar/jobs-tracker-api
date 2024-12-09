import { StatusCodes } from "http-status-codes";
import { Result } from "../utils/Result.js";

const notFoundMiddleware = (req, res) =>
  res
    .status(StatusCodes.NOT_FOUND)
    .json(Result.failure("Route does not exist"));

export { notFoundMiddleware };
