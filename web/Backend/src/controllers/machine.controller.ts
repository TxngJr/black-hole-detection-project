import { IGovernment } from "../interfaces/government.interface";
import { IMachine } from "../interfaces/mahine.interface";
import GovernmentModel from "../models/government.model";
import { Request, Response } from "express";
import MachineModel from "../models/machine.model";

const getMachineCanUse = async (req: Request, res: Response) => {
  try {
    const findGovernment: IGovernment[] | null = await GovernmentModel.distinct(
      "_machineListId"
    );
    const findMachineCanUse: IMachine[] | null = await MachineModel.find({
      _id: { $nin: findGovernment },
    });
    return res.status(200).json(findMachineCanUse);
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

const generateMachine = async (req: Request, res: Response) => {
  try {
    const { macAddress} = req.body;
    const findMachine: IMachine|null = await MachineModel.findOne({macAddress})
    if(findMachine){
      return res.status(400).json(findMachine._id)
    }
    const newMachine: IMachine|null = await MachineModel.create({macAddress})
    if(!newMachine){
      return res.status(404).json({message:"Fail to create machine"})
    }
    return res.status(200).json(newMachine._id)
  } catch (err) {
    return res.status(400).json({ message: "Have Something Wrong" });
  }
};

export default { getMachineCanUse, generateMachine };
