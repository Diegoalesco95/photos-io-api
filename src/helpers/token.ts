import jwt from 'jsonwebtoken';

import config from '../../config';

export default class Token {
	private static seed: string = config.jwtSecret as string;
	private static expiresIn: string = '30d';

	constructor() {}

	static getJwtToken(payload: string | object): string {
		return jwt.sign(payload, this.seed, { expiresIn: this.expiresIn });
	}

	static verifyToken(token: string) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, this.seed, (err, decoded) => {
				if (err) {
					reject();
				}
				resolve(decoded);
			});
		});
	}
}
