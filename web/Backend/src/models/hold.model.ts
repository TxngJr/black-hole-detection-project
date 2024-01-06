import mongoose, { Schema } from 'mongoose';
import { IHold } from '../interfaces/hold.interface';

const HoldSchema: Schema = new Schema({
    path: { type: String, required: true},
    position: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    address: { type: String },
    _machineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine', required: true },
});

const HoldModel = mongoose.model<IHold>('Hold', HoldSchema);

export default HoldModel;