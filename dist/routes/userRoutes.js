"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("../controllers/CreateUserController");
const LoginUserController_1 = require("../controllers/LoginUserController");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
userRoutes.post('/users', new CreateUserController_1.CreateUserController().handle);
userRoutes.get('/login', new LoginUserController_1.LoginUserController().handle);
