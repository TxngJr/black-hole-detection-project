import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";
import accessUserMiddleware from "../middlewares/accessUserByGovertnment.middleware";
import statusMiddleware from "../middlewares/status.middleware";

const router = Router();
//all
router.post("/register", userController.register);
//all
router.post("/login", userController.login);
//all
router.get("/self", authMiddleware.authenticateToken, userController.self);
//if be superadmin will find all user else find all by _governmentId
router.get(
  "/fetch-users",
  authMiddleware.authenticateToken,
  userController.fetchUsers
);

router.put(
  "/change-status-user",
  authMiddleware.authenticateToken,
  statusMiddleware.checkAccessPermissionActive,
  roleMiddleware.checkAccessPermissionAdmin,
  accessUserMiddleware.accessUser,
  userController.changeStatusUser
);

router.put(
  "/change-role-user",
  authMiddleware.authenticateToken,
  roleMiddleware.checkAccessPermissionSuperAdmin,
  userController.changeRoleUser
);

router.delete(
  "/delete-user",
  authMiddleware.authenticateToken,
  roleMiddleware.checkAccessPermissionAdmin,
  accessUserMiddleware.accessUser,
  userController.deleteUser
);

export default router;
