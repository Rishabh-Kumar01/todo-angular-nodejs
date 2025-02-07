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
  return { token, isSuperUser: user.isSuperUser };
};

export const getNonSuperUsers = async () => {
  try {
    // Find all non-superusers, excluding password field
    const users = await User.find(
      { isSuperUser: false },
      { password: 0, isSuperUser: 0 }
    ).sort({ createdAt: -1 });
    return users;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const toggleUserActive = async (userId, currentUser) => {
  try {
    if (userId === currentUser._id) {
      throw new Error("Cannot deactivate yourself");
    }

    // Check if target user exists
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      throw new Error("User not found");
    }

    // Prevent modifying other superusers
    if (targetUser.isSuperUser) {
      throw new Error("Cannot modify superuser status");
    }

    // Toggle isActive status
    targetUser.isActive = !targetUser.isActive;
    await targetUser.save();

    // Return user without password
    const { password, ...userWithoutPassword } = targetUser.toObject();
    return userWithoutPassword;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUser = async (userId, currentUser) => {
  try {
    if (userId === currentUser._id) {
      throw new Error("Cannot delete own account");
    }

    // Check if target user exists
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      throw new Error("User not found");
    }

    // Prevent deleting superusers
    if (targetUser.isSuperUser) {
      throw new Error("Cannot delete superuser");
    }

    // Delete the user
    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error(error.message);
  }
};
