import express, { Request, Response } from 'express';
import { CreateUserController } from './controllers/users/CreateUserController';
import { LoginUserController } from './controllers/users/LoginUserController';

const app = express();
const port = 3000;

app.use(express.json());

const createUser = new CreateUserController();
const login = new LoginUserController();

app.post('/sign-up', createUser.handle);
app.get('/login', login.handle);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });

