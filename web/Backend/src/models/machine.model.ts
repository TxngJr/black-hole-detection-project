import mongoose, { Schema } from "mongoose";
import { IMachine } from "../interfaces/mahine.interface";

const MachineSchema: Schema = new Schema({
  macAddress: { type: String, required: true, unique: true },
});

const MachineModel = mongoose.model<IMachine>("Machine", MachineSchema);

export default MachineModel;
