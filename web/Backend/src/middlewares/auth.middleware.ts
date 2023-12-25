import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import {
  IUser,
  NextFunctionAndUser,
  RequestAndUser,
  ResponseAndUser,
} from "../interfaces/user.interface";
import dotenv from "dotenv";
import UserModel from "../models/user.model";

dotenv.config();

const authenticateToken = async (
  req: RequestAndUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET!,
    async (
      err: jwt.VerifyErrors | null,
      decode: { _id: string } | any
    ): Promise<NextFunctionAndUser | ResponseAndUser | any> => {
      if (err) {
        return res.status(403).json({ message: "Token is expired" });
      }
      let user: IUser | null = await UserModel.findById(decode._id);
      if (!user) {
        return res.status(403).json({ message: "User Not Found" });
      }
      delete user.hashPassword;
      req.user = user;
      next();
    }
  );
};

export default { authenticateToken };
