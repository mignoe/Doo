"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CreateUserController_1 = require("./controllers/users/CreateUserController");
const LoginUserController_1 = require("./controllers/users/LoginUserController");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const createUser = new CreateUserController_1.CreateUserController();
const login = new LoginUserController_1.LoginUserController();
app.post('/sign-up', createUser.handle);
app.get('/login', login.handle);
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
