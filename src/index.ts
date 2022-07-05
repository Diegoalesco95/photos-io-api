import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import config from '../config';

import Server from '@server/index';

import userRoutes from '@routes/users.routes';
import postRoutes from '@routes/post.routes';

const mongoUri = `mongodb+srv://${config.dbUsername}:${config.dbPassword}@${config.dbHost}/${config.dbName}`;

const server = new Server();

server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

server.app.use(fileUpload());

server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

mongoose.connect(mongoUri, {}, (err) => {
	if (err) throw err;
	console.log('[mongoDB]: ✅ Connected');
});

server.start(() => {
	console.log(`[server] ✅ Running in http://localhost:${server.port}`);
});
