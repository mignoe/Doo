import { Router } from 'express';
import { CreateUserController } from '../controllers/user/CreateUserController';
import { LoginUserController } from '../controllers/user/LoginUserController';

const userRoutes = Router();


userRoutes.post('/users', new CreateUserController().handle);
userRoutes.get('/login', new LoginUserController().handle);

export { userRoutes };