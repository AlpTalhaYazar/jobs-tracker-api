import { User } from "../models/User.js";
import { AuthService } from "../services/authService.js";
import { UnauthenticatedError } from "../errors/index.js";

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthenticatedError("Authentication token is missing");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError(
      "Authentication token must be a Bearer token"
    );
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new UnauthenticatedError("Authentication token is missing");
  }

  try {
    const payload = AuthService.verifyToken(token);

    const user = await User.findById(payload.id)
      .select("-password -passwordSalt -__v")
      .lean()
      .exec();

    if (!user) {
      throw new UnauthenticatedError("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication token is invalid");
  }
};

export { authenticationMiddleware };
