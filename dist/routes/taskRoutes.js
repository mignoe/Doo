"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const express_1 = require("express");
const CreateTaskController_1 = require("../controllers/task/CreateTaskController");
const CompleteTaskController_1 = require("../controllers/task/CompleteTaskController");
const GetTasksBySessionController_1 = require("../controllers/task/GetTasksBySessionController");
const taskRoutes = (0, express_1.Router)();
exports.taskRoutes = taskRoutes;
const createTaskController = new CreateTaskController_1.CreateTaskController();
const completeTaskController = new CompleteTaskController_1.CompleteTaskController();
const getTasksBySessionController = new GetTasksBySessionController_1.GetTasksBySessionController();
taskRoutes.post('/tasks/create', createTaskController.handle);
taskRoutes.patch('/tasks/complete', completeTaskController.handle);
taskRoutes.get('/tasks/getTasksBySession', getTasksBySessionController.handle);
