import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import {
  IUser,
  NextFunctionAndUser,
  RequestAndUser,
  ResponseAndUser,
  UserRole,
} from "../interfaces/user.interface";
import dotenv from "dotenv";
import UserModel from "../models/user.model";

dotenv.config();

const authenticateToken = async (
  req: RequestAndUser,
  res: Response,
  next: NextFunction
) => {
  try {
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
        let findUser: IUser | null = await UserModel.findById(
          decode._id
        )
        // .populate("_governmentId");
        if (!findUser) {
          return res.status(403).json({ message: "User Not Found" });
        }
        findUser.hashPassword = undefined;
        req.user = findUser;
        next();
      }
    );
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

export default { authenticateToken };
