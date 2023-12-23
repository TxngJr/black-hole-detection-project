import { NextFunction, Response } from "express";
import { RequestAndUser } from "../interfaces/user.interface";
import dotenv from "dotenv";
import storeService from "../services/store.service";
import { IStore } from "../interfaces/store.interface";

dotenv.config();

const checkAccessPermissionStore = async (
  req: RequestAndUser,
  res: Response,
  next: NextFunction
) => {
  const { role, party } = req.user!;
  const { id } = req.body!;
  const store: IStore | null = await storeService.getStoreById(id);

  if (!store) {
    return res.status(400).json({ message: "Store not found" });
  }

  if (store.userId !== req.user!.id && role !== "admin") {
    return res.status(400).json({ message: "You are not owner" });
  }

  if (store.party !== party) {
    return res.status(400).json({ message: "You are not owner" });
  }

  next();
};

export default { checkAccessPermissionStore };
