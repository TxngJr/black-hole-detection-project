import { Router } from "express";
import governmentController from "../controllers/government.controller";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";

const router = Router();

//all
router.get("/get-government", governmentController.getGovernment);

//superadmin
router.put(
  "/add-machine-in-government",
  authMiddleware.authenticateToken,
  roleMiddleware.checkAccessPermissionSuperAdmin,
  governmentController.addMachineInGovernment
);

//superadmin
router.put(
  "/drop-machine-in-government",
  authMiddleware.authenticateToken,
  roleMiddleware.checkAccessPermissionSuperAdmin,
  governmentController.dropMachineInGovernment
);

export default router;
