import jwt from "jsonwebtoken";
import { RegisterDto, LoginDto } from "../dto/auth.dto.js";
import { Result } from "../utils/Result.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const register = async (req, res) => {
  const registerModel = new RegisterDto(
    req.body.name,
    req.body.email,
    req.body.password
  );

  if (!name || !password) {
    throw BadRequestError("Please provide name and password");
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const result = Result.success({ id, name, token });

  res.status(StatusCodes.CREATED).json(result);
};

const login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    throw BadRequestError("Please provide name and password");
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const result = Result.success({ id, name, token });

  res.status(StatusCodes.OK).json(result);
};

export { register, login };
