import { Router } from 'express';
import { CreateProjectController } from '../controllers/project/CreateProjectController';
import { GetProjectsByUserController } from '../controllers/project/GetProjectsByUserController';
import { AddAdminToProjectController } from '../controllers/project/AddAdminToProjectController';
import { RemoveUserFromProjectController } from '../controllers/project/RemoveUserFromProjectController';
import { AddUserToProjectController } from '../controllers/project/AddUserToProjectController';	

const projectRoutes = Router();

projectRoutes.post('/projects/create', new CreateProjectController().handle);
projectRoutes.get('/projects/getProjectsByUser', new GetProjectsByUserController().handle);
projectRoutes.patch('/projects/addAdmin', new AddAdminToProjectController().handle);
projectRoutes.patch('/projects/removeUser', new RemoveUserFromProjectController().handle);
projectRoutes.patch('/projects/addUser', new AddUserToProjectController().handle);

export { projectRoutes };
