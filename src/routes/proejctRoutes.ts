import { Router } from 'express';
import { CreateProjectController } from '../controllers/project/CreateProjectController';
import { GetProjectsByUser } from '../controllers/project/GetProjectsByUserController';

const projectRoutes = Router();

projectRoutes.post('/projects/create', new CreateProjectController().handle);
projectRoutes.get('/projects/getProjectsByUser', new GetProjectsByUser().handle);


export { projectRoutes };
