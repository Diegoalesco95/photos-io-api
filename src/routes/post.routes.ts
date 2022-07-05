import { Router } from 'express';
import { verifyToken } from '@middlewares/auth';

import {
	createPost,
	getImage,
	getPosts,
	uploadFile,
} from '@controllers/post.controllers';

const postRoutes = Router();

postRoutes.get('/', verifyToken, getPosts);
postRoutes.post('/', verifyToken, createPost);
postRoutes.post('/upload', verifyToken, uploadFile);
postRoutes.get('/image/:userId/:imgId', verifyToken, getImage);

export default postRoutes;
