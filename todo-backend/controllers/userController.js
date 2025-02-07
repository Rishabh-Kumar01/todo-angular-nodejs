import * as userService from "../services/userService.js";

export const signup = async (req, res) => {
  try {
    const data = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const data = await userService.loginUser(req.body);
    res.json({
      success: true,
      message: "Login successful",
      data,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

export const listNonSuperUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: 'Invalid pagination parameters',
        error: 'Page and limit must be positive numbers'
      });
    }

    const { users, pagination } = await userService.getNonSuperUsers(page, limit);
    
    res.json({
      success: true,
      message: 'Users fetched successfully',
      data: {
        users,
        pagination
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

export const toggleUserActiveStatus = async (req, res) => {
  try {
    const updatedUser = await userService.toggleUserActive(
      req.params.userId,
      req.user
    );
    res.json({
      success: true,
      message: updatedUser.isActive
        ? "User activated successfully"
        : "User deactivated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update user status",
      error: error.message,
    });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    await userService.deleteUser(req.params.userId, req.user);
    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};
