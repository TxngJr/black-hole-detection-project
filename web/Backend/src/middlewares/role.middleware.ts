import { NextFunction, Response } from "express";
import { RequestAndUser, UserRole } from "../interfaces/user.interface";

const checkAccessPermissionAdmin = async (
  req: RequestAndUser,
  res: Response,
  next: NextFunction
) => {
  const { role } = req.user!;

  if (role === UserRole.USER) {
    return res.status(400).json({ message: "This service for admin" });
  }
  next();
};

const checkAccessPermissionSuperAdmin = async (
  req: RequestAndUser,
  res: Response,
  next: NextFunction
) => {
  const { role } = req.user!;

  if (role !== UserRole.SUPERADMIN) {
    return res.status(400).json({ message: "This service for superadmin" });
  }
  next();
};

export default { checkAccessPermissionAdmin, checkAccessPermissionSuperAdmin };
