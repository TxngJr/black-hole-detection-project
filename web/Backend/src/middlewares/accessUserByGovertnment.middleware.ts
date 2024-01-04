import { NextFunction, Response } from "express";
import { IUser, RequestAndUser, UserRole } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { IGovernment } from "../interfaces/government.interface";
import GovernmentModel from "../models/government.model";

const accessUser = async (
  req: RequestAndUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id }: any = req.query || req.body;
    const { _governmentId } = req.user!;

    const findUser: IUser | null = await UserModel.findById({ _id });

    if (!findUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const findGovernment: IGovernment | null = await GovernmentModel.findById({
      _id: findUser._governmentId,
    });

    if (!findGovernment) {
      return res.status(400).json({ message: "Government not found" });
    }

    if(findUser!._id.equals(req.user!._id)){
      return res.status(400).json({ message: "You can't access self" });
    }

    if (
      !_governmentId.equals(findUser._governmentId) &&
      req.user!.role !== UserRole.SUPERADMIN
    ) {
      return res.status(400).json({ message: "You can't access this user" });
    }

    next();
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

export default { accessUser };
