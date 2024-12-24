import "dotenv/config";
import { User } from "../models/User.js";
import { AuthService } from "../services/authService.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import { RegisterDto, LoginDto } from "../dto/auth.dto.js";
import { OperationResult } from "../utils/OperationResult.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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

  const operationResult = await OperationResult.Success({
    ...tokenPayload,
    token,
  });

  const apiResponse = await ApiResponse.ToApiResponse(operationResult);

  res.status(StatusCodes.CREATED).json(apiResponse);
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

  const operationResult = await OperationResult.Success({
    ...tokenPayload,
    token,
  });

  const apiResponse = await ApiResponse.ToApiResponse(operationResult);

  res.status(StatusCodes.OK).json(apiResponse);
};

export { register, login };
