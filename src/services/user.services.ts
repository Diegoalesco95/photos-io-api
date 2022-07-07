import {
	IGetUserResponse,
	IRequestUser,
	IUserResponse,
} from '@interfaces/user.interface';
import { UserModel } from '@models/user.model';

class UserService {
	userModel: typeof UserModel;

	constructor(private model: typeof UserModel) {
		this.userModel = model;
	}

	async insert(user: IRequestUser): Promise<IUserResponse> {
		try {
			const userDB = await this.userModel.create(user);
			const { avatar, name, email, _id } = userDB;
			return {
				status: 200,
				response: {
					avatar,
					name,
					email,
					_id,
				},
			};
		} catch (err: any) {
			return {
				status: 500,
				message: 'User already exists',
			};
		}
	}

	async findByEmail(email: string): Promise<IGetUserResponse> {
		try {
			const userDB = await this.userModel.findOne({ email });

			if (userDB) {
				return {
					status: 200,
					response: userDB,
				};
			}
			throw new Error('Invalid email or password');
		} catch (err: any) {
			return {
				status: 500,
				message: err.message as string,
			};
		}
	}

	async update(id: string, user: IRequestUser): Promise<IUserResponse> {
		try {
			const userDB = await this.userModel.findByIdAndUpdate(id, user, {
				new: true,
			});

			if (userDB) {
				const { avatar, name, email, _id } = userDB;
				return {
					status: 200,
					response: {
						avatar,
						name,
						email,
						_id,
					},
				};
			}
			throw new Error('User not found');
		} catch (err: any) {
			return {
				status: 500,
				message: err.message as string,
			};
		}
	}
}

export default UserService;
