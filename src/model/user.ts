// Engineer schema

//@ts-check
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


export interface ISignup {
    _id?: string
    userName: string;
    state: string;
    password: string;
}

export interface ILogin {
    _id?: string;
    userName: string;
    password: string
}

export interface IUser {
    _id?: string
    userName: string;
    password: string;
    state: string;
    isAdmin?: boolean;
}


const userShema = new mongoose.Schema({
    userName: { type: String, required: true, lowercase: true, unique: true, trim: true },
    state: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    isAdmin: { type: Boolean, default: false },
});



userShema.plugin(uniqueValidator);

export default mongoose.model<any>('User', userShema);