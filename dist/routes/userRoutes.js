"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("../controllers/user/CreateUserController");
const LoginUserController_1 = require("../controllers/user/LoginUserController");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
userRoutes.post('/sign-up', new CreateUserController_1.CreateUserController().handle);
userRoutes.post('/login', new LoginUserController_1.LoginUserController().handle);
