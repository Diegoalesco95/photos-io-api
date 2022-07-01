import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import config from '../config';

import Server from '@server/index';
import userRoutes from '@routes/users.routes';

const mongoUri = `mongodb+srv://${config.dbUsername}:${config.dbPassword}@${config.dbHost}/${config.dbName}`;

const server = new Server();

server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
server.app.use('/user', userRoutes);

mongoose.connect(mongoUri, {}, (err) => {
	if (err) throw err;
	console.log('[mongoDB]: ✅ Connected');
});

server.start(() => {
	console.log(`[server] ✅ Running in http://localhost:${server.port}`);
});
