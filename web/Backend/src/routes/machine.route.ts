import { Router } from "express";
import machineController from "../controllers/machine.controller";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";

const router = Router();

//superadmin
router.get(
  "/get-machine-can-use",
  authMiddleware.authenticateToken,
  roleMiddleware.checkAccessPermissionSuperAdmin,
  machineController.getMachineCanUse
);

//machine
router.post(
    "/generate-machine",
    machineController.generateMachine,
)

export default router;
