import { NextFunction, Response } from "express";
import { RequestAndUser } from "../interfaces/user.interface";
import dotenv from "dotenv";

dotenv.config();

const checkAccessPermissionAdmin = async (
  req: RequestAndUser,
  res: Response,
  next: NextFunction
) => {
  const { role } = req.user!;

  if (role !== "admin") {
    return res.status(400).json({ message: "This service for admin" });
  }

  next();
};

export default { checkAccessPermissionAdmin };
