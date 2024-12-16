import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { ValidationError } from "../errors/index.js";

const validate = (schemas) => {
  return async (req, res, next) => {
    await Promise.all(schemas.map((schema) => schema.run(req)));

    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }

    const validationError = new ValidationError("Validation failed", result.array());
    throw validationError;
  };
};

export { validate };
