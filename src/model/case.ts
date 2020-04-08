import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


export interface ICase {
    _id: string;
    firstname: string;
    surname: string;
    phoneNumber: string;
    state: string;
    lga: string;
    dateOfBirth: any;
    address: string;
    symptoms: string;
    status?: number; // 5 = fake, 1 = new, 2 = Is Contacted, 3 = Is Confirmed, 4 = Is Quanrantined, 5 = fake
    registeredAt?: string;
    caseId?: string;
};


const caseShema = new mongoose.Schema({
    firstname: { type: String, required: true, lowercase: true, trim: true },
    surname: { type: String, required: true, lowercase: true, trim: true },
    phoneNumber: { type: String, required: true, unique: true, trim: true },
    state: { type: String, required: true, trim: true },
    lga: { type: String, lowercase: true, required: true, trim: true },
    dateOfBirth: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    symptoms: { type: String, required: true, trim: true },
    status: { type: Number, required: true, default: 1 },
    registeredAt: { type: String, default: Date.now },
    caseId: { type: String, required: true, unique: true, trim: true },
});

caseShema.plugin(uniqueValidator);


export default mongoose.model<any>('Case', caseShema);