import "dotenv/config";
import jwt from "jsonwebtoken";

class AuthService {
  static generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

export { AuthService };
