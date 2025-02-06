import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const createUser = async (userData) => {
  const existingUser = await User.findOne({ username: userData.username });
  if (existingUser) {
    throw new Error("Username already exists");
  }

  const user = await User.create(userData);
  const token = generateToken(user._id);

  return { token };
};

export const loginUser = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id);
  return { token };
};
