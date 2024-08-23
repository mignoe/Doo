import { Router } from 'express';
import { CreateTaskController } from '../controllers/task/CreateTaskController';
import { CompleteTaskController } from '../controllers/task/CompleteTaskController';
import { GetTasksBySessionController } from '../controllers/task/GetTasksBySessionController';

const taskRoutes = Router();

const createTaskController = new CreateTaskController();
const completeTaskController = new CompleteTaskController();
const getTasksBySessionController = new GetTasksBySessionController();

taskRoutes.post('/tasks/create', createTaskController.handle);
taskRoutes.post('/tasks/complete', completeTaskController.handle);
taskRoutes.get('/tasks/getTasksBySession', getTasksBySessionController.handle);

export { taskRoutes };