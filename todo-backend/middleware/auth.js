import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
        error: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
        error: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Authentication failed",
        error: "Account is inactive",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};
