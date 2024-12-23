import "dotenv/config";
import { User } from "../models/User.js";
import { Result } from "../utils/Result.js";
import { AuthService } from "../services/authService.js";
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
    ...registerUserDto,
  });

  const tokenPayload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  const token = AuthService.generateToken(tokenPayload);

  const result = Result.success({
    ...tokenPayload,
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

  const isPasswordValid = await user.comparePassword(loginuserDto.password);

  if (!isPasswordValid) {
    throw new BadRequestError("Invalid credentials");
  }

  const tokenPayload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  const token = AuthService.generateToken(tokenPayload);

  const result = Result.success({
    ...tokenPayload,
    token,
  });

  res.status(StatusCodes.OK).json(result);
};

export { register, login };
