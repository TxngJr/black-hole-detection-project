import { IGovernment } from "../interfaces/government.interface";
import { IUser } from "../interfaces/user.interface";
import GovernmentModel from "../models/government.model";
import { Request, Response } from "express";

const getGovernment = async (req: Request, res: Response) => {
  try {
    const findGovernments: IGovernment[] | null =
      await GovernmentModel.find().populate("_machineListId");

    return res.status(200).json(findGovernments);
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

const addMachineInGovernment = async (req: Request, res: Response) => {
  try {
    const { _governmentId, _machineId }: any = req.query;
    const findGovernmentByMachineId: IGovernment | null =
      await GovernmentModel.findOne({ _machineListId: { $in: _machineId } });
    if (findGovernmentByMachineId) {
      return res.status(400).json({
        message: `This machine is already in ${findGovernmentByMachineId.name}.`,
      });
    }
    const updateGovernment: IUser | null =
      await GovernmentModel.findByIdAndUpdate(
        { _id: _governmentId },
        {
          $push: { _machineListId: _machineId },
        }
      );
    if (!updateGovernment) {
      return res.status(404).json({ message: "Government not found" });
    }
    return res.status(200).json({ message: "Add machine success" });
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

const dropMachineInGovernment = async (req: Request, res: Response) => {
  try {
    const { _governmentId, _machineId }: any = req.query;
    const updateGovernment: IUser | null =
      await GovernmentModel.findByIdAndUpdate(
        { _id: _governmentId },
        {
          $pull: { _machineListId: _machineId },
        }
      );
    if (!updateGovernment) {
      return res.status(404).json({ message: "Government not found" });
    }
    return res.status(200).json({ message: "Drop machine success" });
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

export default {
  getGovernment,
  addMachineInGovernment,
  dropMachineInGovernment,
};
