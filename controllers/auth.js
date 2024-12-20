import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { Result } from "../utils/Result.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import { RegisterDto, LoginDto } from "../dto/auth.dto.js";

const register = async (req, res) => {
  const registerUserDto = new RegisterDto(
    req.body.name,
    req.body.email,
    req.body.password
  );

  const user = await User.create({
    name: registerUserDto.name,
    email: registerUserDto.email,
    password: registerUserDto.password,
  });

  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  const result = Result.success({
    id: user._id,
    name: user.name,
    email: user.email,
    token,
  });

  res.status(StatusCodes.CREATED).json(result);
};

const login = async (req, res) => {
  const loginuserDto = new LoginDto(req.body.email, req.body.password);

  const user = await User.findOne({ email: loginuserDto.email });

  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(
    loginuserDto.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new BadRequestError("Invalid credentials");
  }

  const result = Result.success({
    id: user._id,
    name: user.name,
    email: user.email,
  });

  res.status(StatusCodes.OK).json(result);
};

export { register, login };
