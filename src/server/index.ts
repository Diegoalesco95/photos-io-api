import express from 'express';
import config from '../../config';

export default class Server {
	public app: express.Application;
	public port: number = Number(config.port) || 3000;

	constructor() {
		this.app = express();
	}

	start(callback: Function) {
		this.app.listen(this.port, callback());
	}
}
