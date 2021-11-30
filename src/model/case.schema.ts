import mongoose, { Schema } from 'mongoose';

import { ICase } from '../interface/case.interface';


const caseShema: Schema<ICase> = new Schema({
    firstname: { type: String, required: true, lowercase: true, trim: true },
    surname: { type: String, required: true, lowercase: true, trim: true },
    phoneNumber: { type: String, required: true, unique: true, trim: true },
    state: { type: String, required: true, trim: true },
    lga: { type: String, lowercase: true, required: true, trim: true },
    dateOfBirth: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    symptoms: { type: String, required: true, trim: true },
    status: { type: Number, required: true, default: 1 },
    registeredAt: { type: Number, default: Date.now },
    caseId: { type: String, required: true, unique: true, trim: true },
});


export const Case = mongoose.model<ICase>('Case', caseShema);