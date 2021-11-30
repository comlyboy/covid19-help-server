
export interface IBaseFullName {
    firstname: string;
    surname: string;
};


export interface IBaseState {
    state: string;
};

export enum CaseStatusEnum {
    isNew = 1,
    isContacted = 2,
    isConfirmed = 3,
    isQuanrantined = 4,
    isNotSick = 5,
    isFake = 6
};

