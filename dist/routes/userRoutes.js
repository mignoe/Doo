"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("../controllers/CreateUserController");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
userRoutes.post('/users', new CreateUserController_1.CreateUserController().handle);
