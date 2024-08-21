"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRoutes = void 0;
const express_1 = require("express");
const CreateSessionController_1 = require("../controllers/session/CreateSessionController");
const sessionRoutes = (0, express_1.Router)();
exports.sessionRoutes = sessionRoutes;
const createSessionController = new CreateSessionController_1.CreateSessionController();
sessionRoutes.post('/session/create', createSessionController.handle);
