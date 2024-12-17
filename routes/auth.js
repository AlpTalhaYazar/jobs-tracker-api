import express from "express";
import { validate } from "../validation/validation.js";
import { registerSchema, loginSchema } from "../validation/auth/validationSchemas.js";
import { register, login } from "../controllers/auth.js";

const router = express.Router();

router.route("/register").post(validate(registerSchema), register);
router.route("/login").post(validate(loginSchema), login);

export { router as authRoutes };
