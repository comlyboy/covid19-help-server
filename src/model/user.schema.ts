// Engineer schema

//@ts-check
import mongoose from 'mongoose';
import { IUser } from '../interface/user.interface';

const userShema = new mongoose.Schema({
    userName: { type: String, required: true, lowercase: true, unique: true, trim: true },
    state: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    isAdmin: { type: Boolean, default: false },
});



export const User = mongoose.model<IUser>('User', userShema);