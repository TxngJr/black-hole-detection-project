import { Router } from "express";
import holdController from "../controllers/hold.controller";
import multer from "multer";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";
import statusMiddleware from "../middlewares/status.middleware";
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.get("/", 
authMiddleware.authenticateToken, 
statusMiddleware.checkAccessPermissionActive, 
holdController.getHolds);

router.post("/", upload.single("image"), holdController.createHold);

router.delete(
  "/",
  authMiddleware.authenticateToken,
  roleMiddleware.checkAccessPermissionAdmin,
  holdController.deleteHold
);

router.get("/img", holdController.getHoldImg);

export default router;
