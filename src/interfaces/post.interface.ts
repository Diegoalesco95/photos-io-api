import { Document } from 'mongoose';
import { Response } from '@interfaces/response.interface';

export interface IPost extends Document {
	createdAt: Date;
	message: string;
	imgs: string[];
	coords: string;
	user: string;
}

export interface IRequestPost {
	coords: string;
	imgs: string[];
	message: string;
	user: string;
}

export interface IPostResponse extends Response {
	response?: IPost;
}
