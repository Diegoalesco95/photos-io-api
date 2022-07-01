import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUserDB } from '@interfaces/user.interface';

const userSchema = new Schema({
	avatar: {
		type: String,
		default: 'av-1.png',
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'Email is required'],
	},
	name: {
		type: String,
		required: [true, 'Name is required'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
	},
});

userSchema.method('comparePassword', function (password: string = ''): boolean {
	return bcrypt.compareSync(password, this.password);
});

export const UserModel = model<IUserDB>('User', userSchema);
