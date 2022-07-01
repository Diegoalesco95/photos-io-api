import { Router } from 'express';

import { createUser, login, updateUser } from '@controllers/user.controllers';
import { verifyToken } from 'middlewares/auth';

const userRoutes = Router();

userRoutes.post('/new', createUser);
userRoutes.post('/login', login);
userRoutes.put('/update', verifyToken, updateUser);

export default userRoutes;
