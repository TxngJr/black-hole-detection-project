import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const UserSchema: Schema = new Schema({
    username: { type: String, required: true},
    hashPassword: { type: String, required: true},
    government: { type: String, required: true},
    role: {type: String, required: true, enum: ['user', 'admin']},
    status: {type: String, required: true, enum: ['active', 'inactive']},
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;