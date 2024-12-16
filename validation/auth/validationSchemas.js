import { body } from "express-validator";

export const registerSchema = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginSchema = [
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password").isString().withMessage("Password must be a string"),
];
