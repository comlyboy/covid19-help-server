// Engineer schema

//@ts-check
import mongoose from 'mongoose';
import { IBaseState } from './common.interface';

export interface UserLoginDto {
    userName: string;
    password: string
}

export interface UserSignUpDto extends UserLoginDto, IBaseState {}


export interface IUser {
    _id?: string
    userName: string;
    password: string;
    state: string;
    isAdmin?: boolean;
}
