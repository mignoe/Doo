import { Router } from 'express';
import { CreateProjectController } from '../controllers/CreateProjectController';
import { GetUserProjectsController } from '../controllers/GetUserProjectsController';

const projectRoutes = Router();

projectRoutes.post('/projects', new CreateProjectController().handle);
projectRoutes.get('/userProjects', new GetUserProjectsController().handle);


export { projectRoutes };
