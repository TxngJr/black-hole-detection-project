import { NextFunction, Response } from "express";
import { RequestAndUser, UserStatus } from "../interfaces/user.interface";
import dotenv from "dotenv";

dotenv.config();

const checkAccessPermissionActive = async (
  req: RequestAndUser,
  res: Response,
  next: NextFunction
) => {
  const { status } = req.user!;

  if (status === UserStatus.INACTIVE) {
    return res.status(400).json({ message: "You can use This Service" });
  }

  next();
};

export default { checkAccessPermissionActive };
