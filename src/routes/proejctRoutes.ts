import { Router } from 'express';
import { CreateProjectController } from '../controllers/project/CreateProjectController';
import { GetUserProjectsController } from '../controllers/project/GetUserProjectsController';

const projectRoutes = Router();

projectRoutes.post('/projects', new CreateProjectController().handle);
projectRoutes.get('/userProjects', new GetUserProjectsController().handle);


export { projectRoutes };
