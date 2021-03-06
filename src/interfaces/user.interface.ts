import { Document } from 'mongoose';
import { Response } from '@interfaces/response.interface';

export interface IUser {
	avatar: string;
	email: string;
	name: string;
	password?: string;
	_id?: string;
}

export interface IUserDB extends Document {
	avatar: string;
	email: string;
	name: string;
	password: string;

	comparePassword(password: string): boolean;
}

export interface IRequestUser extends IUser {}

export interface IUserResponse extends Response {
	response?: IUser;
}

export interface IGetUserResponse extends Response {
	response?: IUserDB;
}
