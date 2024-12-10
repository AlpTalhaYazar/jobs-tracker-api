import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import { Result } from "../utils/Result.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw BadRequestError("Please provide username and password");
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const result = Result.success({ id, username, token });

  res.status(StatusCodes.OK).json(result);
};

export { login };
