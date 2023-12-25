import { Request, Response } from "express";
import {
  IUser,
  UserRole,
  UserStatus,
  RequestAndUser,
} from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const register = async (req: Request, res: Response) => {
  try {
    const { username, password, government } = req.body;
    const role = UserRole.USER;
    const status = UserStatus.INACTIVE;
    const userExits: IUser | null = await UserModel.findOne({ username });
    if (userExits) {
      return res.status(400).json({
        message: `There is already a user named ${userExits.username}.`,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const userCreate = await UserModel.create({
      username,
      hashPassword,
      government,
      role,
      status,
    });
    if (!userCreate) {
      return res.status(404).json({ message: "Fail to register" });
    }
    return res.status(201).json({ message: "Create user success" });
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user: IUser | null = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: `Password or Username Wrong.`,
      });
    }
    const passwordIsMatch = await bcrypt.compare(password, user.hashPassword!);
    if (!passwordIsMatch) {
      return res.status(400).json({
        message: `Password or Username Wrong.`,
      });
    }
    const token = await jwt.sign(
      { _id: String(user._id) },
      process.env.JWT_SECRET!,
      {
        expiresIn: "5h",
      }
    );
    return res.status(200).json({ token: token });
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

const self = async (req: RequestAndUser, res: Response) => {
  try {
    return res.status(200).json(req.user);
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { _id }: any = req.query;
    const users = await UserModel.findByIdAndDelete(_id);
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Delete user success" });
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

const getUsers = async (req: RequestAndUser, res: Response) => {
  try {
    const { _id } = req.user!;
    const { page, pageSize }: any = req.query;

    const users: IUser[] | null = await UserModel.find({ _id: { $ne: _id } })
      .skip((Number(page) - 1) * Number(pageSize))
      .limit(pageSize);

    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

const changeStatusUser = async (req: RequestAndUser, res: Response) => {
  try {
    const { _id, status }: any = req.query;

    if (!Object.values(UserStatus).includes(status)) {
      return res.status(400).json({
        message: `Have not Status ${status}`,
      });
    }

    const users: IUser | null = await UserModel.findByIdAndUpdate(_id, {
      status,
    });
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Change status success" });
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

export default {
  register,
  login,
  self,
  deleteUser,
  getUsers,
  changeStatusUser,
};
