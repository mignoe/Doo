import { Router } from 'express';
import { CreateProjectController } from '../controllers/project/CreateProjectController';
import { GetProjectsByUserController } from '../controllers/project/GetProjectsByUserController';
import { AddAdminToProjectController } from '../controllers/project/AddAdminToProjectController';
import { RemoveUserFromProjectController } from '../controllers/project/RemoveUserFromProjectController';
import { AddUserToProjectController } from '../controllers/project/AddUserToProjectController';	

import { verifyInputs } from '../utils/verifyInputs';

const projectRoutes = Router();

projectRoutes.post('/projects/create', verifyInputs, new CreateProjectController().handle);
projectRoutes.get('/projects/getProjectsByUser', verifyInputs, new GetProjectsByUserController().handle);
projectRoutes.patch('/projects/addAdmin', verifyInputs,new AddAdminToProjectController().handle);
projectRoutes.delete('/projects/removeUser', verifyInputs,new RemoveUserFromProjectController().handle);
projectRoutes.patch('/projects/addUser', verifyInputs,new AddUserToProjectController().handle);

export { projectRoutes };
