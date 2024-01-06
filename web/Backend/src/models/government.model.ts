import mongoose, { Schema } from "mongoose";
import { IGovernment } from "../interfaces/government.interface";

const GovernmentSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  _machineListId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      required: false,
    },
  ],
});

const GovernmentModel = mongoose.model<IGovernment>(
  "Government",
  GovernmentSchema
);

export default GovernmentModel;
