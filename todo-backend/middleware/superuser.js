export const requireSuperUser = async (req, res, next) => {
  try {
    // Check if user exists and is a superuser
    if (!req.user.isSuperUser) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
        error: "Superuser privileges required",
      });
    }
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "Access check failed",
      error: error.message,
    });
  }
};
