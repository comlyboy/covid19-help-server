import { CaseStatusEnum, IBaseFullName, IBaseState } from "./common.interface";

export interface NewCaseDto extends IBaseFullName, IBaseState {
    phoneNumber: string;
    state: string;
    lga: string;
    dateOfBirth: string;
    address: string;
    symptoms: string;
}



export interface ICase extends NewCaseDto {
    _id: string;
    status?: CaseStatusEnum; // 5 = fake, 1 = new, 2 = Is Contacted, 3 = Is Confirmed, 4 = Is Quanrantined, 5 = fake
    registeredAt?: number;
    caseId?: string;
};

