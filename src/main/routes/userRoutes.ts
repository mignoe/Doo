import { Router } from 'express';
import { CreateUserController } from '../controllers/user/CreateUserController';
import { LoginUserController } from '../controllers/user/LoginUserController';

const userRoutes = Router();


userRoutes.post('/sign-up', new CreateUserController().handle);
userRoutes.post('/login', new LoginUserController().handle);

export { userRoutes };