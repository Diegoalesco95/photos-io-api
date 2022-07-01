import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';

import UserService from '@services/user.services';
import { UserModel } from '@models/user.model';
import Token from 'helpers/token';

const userService = new UserService(UserModel);

export async function createUser(req: Request, res: Response) {
	const user = {
		avatar: req.body.avatar,
		name: req.body.name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10),
	};

	const { response, status, message } = await userService.insert(user);
	if (status === 200 && response) {
		const token = Token.getJwtToken({
			avatar: response.avatar,
			id: response?._id,
			email: response.email,
			name: response.name,
		});

		res.status(status).json({
			token,
			user: response,
		});
	} else {
		res.status(status).json({ message });
	}
}

export async function login(req: Request, res: Response) {
	const { email, password } = req.body;
	const { response, status, message } = await userService.findByEmail(email);

	if (status === 200 && response?.comparePassword(password)) {
		const user = {
			avatar: response.avatar,
			id: response._id,
			email: response.email,
			name: response.name,
		};
		const token = Token.getJwtToken(user);
		res.status(status).json({ token, user });
	} else {
		res.status(status).json({ message });
	}
}

export async function updateUser(req: Request | any, res: Response) {
	const { id, name, email, avatar } = req.user;

	const newUser = {
		avatar: req.body.avatar || avatar,
		name: req.body.name || name,
		email: req.body.email || email,
	};

	const { response, status, message } = await userService.update(id, newUser);
	if (status === 200 && response) {
		res.status(status).json({ response });
	} else {
		res.status(status).json({ message });
	}
}
