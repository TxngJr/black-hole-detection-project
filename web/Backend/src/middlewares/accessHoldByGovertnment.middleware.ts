import { NextFunction, Response } from "express";
import { RequestAndUser, UserRole } from "../interfaces/user.interface";
import dotenv from "dotenv";
import HoldModel from "../models/hold.model";
import { IHold } from "../interfaces/hold.interface";
import GovernmentModel from "../models/government.model";
import { IGovernment } from "../interfaces/government.interface";

dotenv.config();

const accessHold = async (
  req: RequestAndUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id }: any = req.query || req.body;
    const { _governmentId } = req.user!;

    const findHold: IHold | null = await HoldModel.findById({ _id });

    if (!findHold) {
      return res.status(400).json({ message: "Hold not found" });
    }

    const findGovernment: IGovernment | null = await GovernmentModel.findById({
      _id: _governmentId,
    });

    if (!findGovernment) {
      return res.status(400).json({ message: "Government not found" });
    }

    if (
      !findGovernment._machineListId.some(id => findHold._machineId.equals(id)) &&
      req.user!.role !== UserRole.SUPERADMIN
    ) {
      return res.status(400).json({ message: "You can't access this hold" });
    }
    next();
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

export default { accessHold };
