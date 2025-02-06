import express from "express";
import * as userController from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import { requireSuperUser } from "../middleware/superuser.js";

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);

// Superuser routes
router.get(
  "/non-super-users",
  protect,
  requireSuperUser,
  userController.listNonSuperUsers
);

router.patch(
  "/toggle-status/:userId",
  protect,
  requireSuperUser,
  userController.toggleUserActiveStatus
);

router.delete(
  "/delete/:userId",
  protect,
  requireSuperUser,
  userController.deleteUserById
);

export default router;
