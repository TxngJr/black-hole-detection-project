import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";

const router = Router();
router.get("/self", authMiddleware.authenticateToken, userController.self);
router.get(
  "/fetch-users",
  authMiddleware.authenticateToken,
  roleMiddleware.checkAccessPermissionAdmin,
  userController.getUsers
);
router.get(
  "/change-status-user",
  authMiddleware.authenticateToken,
  roleMiddleware.checkAccessPermissionAdmin,
  userController.changeStatusUser
);
router.get(
  "/change-role-user",
  authMiddleware.authenticateToken,
  roleMiddleware.checkAccessPermissionAdmin,
  userController.changeRoleUser
);
router.delete(
  "/delete-user",
  authMiddleware.authenticateToken,
  roleMiddleware.checkAccessPermissionAdmin,
  userController.deleteUser
);
router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
