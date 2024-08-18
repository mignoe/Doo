import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { LoginUserController } from '../controllers/LoginUserController';

const userRoutes = Router();


userRoutes.post('/users', new CreateUserController().handle);
userRoutes.get('/login', new LoginUserController().handle);

export { userRoutes };