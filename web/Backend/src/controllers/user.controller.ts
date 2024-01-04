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
import { IGovernment } from "../interfaces/government.interface";
import GovernmentModel from "../models/government.model";
import mongoose from "mongoose";
import { IMachine } from "../interfaces/mahine.interface";
import MachineModel from "../models/machine.model";

dotenv.config();

const register = async (req: Request, res: Response) => {
  try {
    const { username, password, government } = req.body;
    if (username.length < 8) {
      return res.status(400).json({
        message: `Username must be at least 8 characters long.`,
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        message: `Password must be at least 8 characters long.`,
      });
    }
    if (government.length < 10) {
      return res.status(400).json({
        message: `Government must be at least 10 characters long.`,
      });
    }

    const userExits: IUser | null = await UserModel.findOne({ username });

    if (userExits) {
      return res.status(400).json({
        message: `There is already a user named ${userExits.username}.`,
      });
    }

    const status = UserStatus.INACTIVE;

    if (!mongoose.Types.ObjectId.isValid(government)) {
      const governmentExits: IGovernment | null = await GovernmentModel.findOne(
        { name: government }
      );
      if (governmentExits) {
        return res.status(400).json({
          message: `There is already a government named ${governmentExits.name}.`,
        });
      }

      const role = UserRole.ADMIN;
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser: IUser | null = await UserModel.create({
        username,
        hashPassword,
        role,
        status,
      });
      if (!newUser) {
        return res.status(404).json({ message: "Fail to create user" });
      }

      const newGovernment: IGovernment | null = await GovernmentModel.create({
        name: government,
        _userId: newUser._id,
      });
      if (!newGovernment) {
        return res.status(404).json({ message: "Fail to create government" });
      }
      const updateUser: IUser | null = await UserModel.findByIdAndUpdate(
        newUser._id,
        {
          _governmentId: newGovernment._id,
        }
      );
      if (!updateUser) {
        return res.status(404).json({ message: "Fail to update user" });
      }
    } else {
      const role = UserRole.USER;
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser: IUser | null = await UserModel.create({
        username,
        hashPassword,
        role,
        status,
        _governmentId: government,
      });
      if (!newUser) {
        return res.status(404).json({ message: "Fail to create user" });
      }
    }
    return res.status(201).json({ message: "Create success" });
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (username.length < 8) {
      return res.status(400).json({
        message: `Username must be at least 8 characters long.`,
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: `Password must be at least 8 characters long.`,
      });
    }

    const findUser: IUser | null = await UserModel.findOne({ username });
    if (!findUser) {
      return res.status(400).json({
        message: `Password or Username Wrong.`,
      });
    }

    const passwordIsMatch = await bcrypt.compare(
      password,
      findUser.hashPassword!
    );
    if (!passwordIsMatch) {
      return res.status(400).json({
        message: `Password or Username Wrong.`,
      });
    }
    const token = await jwt.sign(
      { _id: String(findUser._id) },
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
    const { _governmentId } = req.user!;
    const findGovernment: IGovernment | null = await GovernmentModel.findById({
      _id: _governmentId,
    });
    if (!findGovernment) {
      return res.status(404).json({ message: "Government not found" });
    }
    const data: IUser = {
      _id: req.user!._id,
      username: req.user!.username,
      role: req.user!.role,
      status: req.user!.status,
      _governmentId: findGovernment,
    };
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

const fetchUsers = async (req: RequestAndUser, res: Response) => {
  try {
    const { _governmentId, role, _id } = req.user!;
    const { page, pageSize }: any = req.query;
    if (role === UserRole.SUPERADMIN) {
      let findUsers: IUser[] | null = await UserModel.find({
        _id: { $nin: _id },
      })
        .populate("_governmentId")
        .select("-hashPassword")
        .skip((Number(page) - 1) * Number(pageSize))
        .limit(pageSize);

      const findUsersWithMachines = await Promise.all(
        findUsers.map(async (user: IUser): Promise<IUser> => {
          const findMachines: IMachine[] | null = await MachineModel.find({
            _id: { $in: user._governmentId._machineListId },
          });
          return {
            _id: user._id,
            username: user.username,
            role: user.role,
            status: user.status,
            _governmentId: {
              _id: user._governmentId._id,
              name: user._governmentId.name,
              _userId: user._governmentId._userId,
              _machineListId: findMachines,
            },
          };
        })
      );

      return res.status(200).json(findUsersWithMachines);
    } else {
      const findUsers: IUser[] | null = await UserModel.find({
        _governmentId,
        _id: { $nin: _id },
      })
        .select("-hashPassword")
        .skip((Number(page) - 1) * Number(pageSize))
        .limit(pageSize);
      return res.status(200).json(findUsers);
    }
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
    const updateUser: IUser | null = await UserModel.findByIdAndUpdate(_id, {
      status,
    });
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Change status success" });
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

const changeRoleUser = async (req: RequestAndUser, res: Response) => {
  try {
    const { _id, role }: any = req.query;
    if (!Object.values(UserRole).includes(role)) {
      return res.status(400).json({
        message: `Have not Role ${role}`,
      });
    }
    const updateUser: IUser | null = await UserModel.findByIdAndUpdate(_id, {
      role,
    });
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Change role success" });
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { _id }: any = req.query;
    const deleteUser = await UserModel.findByIdAndDelete(_id);
    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Delete user success" });
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

export default {
  register,
  login,
  self,
  fetchUsers,
  deleteUser,
  changeStatusUser,
  changeRoleUser,
};
