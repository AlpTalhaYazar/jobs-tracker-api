import { body } from "express-validator";

export const jobCreateDtoSchema = [
  body("company")
    .isString()
    .withMessage("Company must be a string")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Company must be between 3 and 50 characters"),
  body("position")
    .isString()
    .withMessage("Position must be a string")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Position must be between 3 and 50 characters"),
  body("status")
    .default("pending")
    .isString()
    .withMessage("Status must be a string")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Status must be between 3 and 50 characters"),
];
