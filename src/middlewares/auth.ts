import { NextFunction, Request, Response } from 'express';
import Token from 'helpers/token';

export const verifyToken = (
	req: Request | any,
	res: Response,
	next: NextFunction,
) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const token = authorization.split(' ')[1];

	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	Token.verifyToken(token)
		.then((decoded: any) => {
			req.user = decoded;
			next();
		})
		.catch(() => {
			return res.status(401).json({ message: 'Unauthorized' });
		});
};
