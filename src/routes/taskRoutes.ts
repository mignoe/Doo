import { Router } from 'express';
import { CreateTaskController } from '../controllers/task/CreateTaskController';
import { CompleteTaskController } from '../controllers/task/CompleteTaskController';

const taskRoutes = Router();

const createTaskController = new CreateTaskController();
const completeTaskController = new CompleteTaskController();

taskRoutes.post('/task/create', createTaskController.handle);
taskRoutes.post('/task/complete', completeTaskController.handle);

export { taskRoutes };