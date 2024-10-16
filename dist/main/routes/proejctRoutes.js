"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoutes = void 0;
const express_1 = require("express");
const CreateProjectController_1 = require("../controllers/project/CreateProjectController");
const GetProjectsByUserController_1 = require("../controllers/project/GetProjectsByUserController");
const AddAdminToProjectController_1 = require("../controllers/project/AddAdminToProjectController");
const RemoveUserFromProjectController_1 = require("../controllers/project/RemoveUserFromProjectController");
const AddUserToProjectController_1 = require("../controllers/project/AddUserToProjectController");
const verifyInputs_1 = require("../utils/verifyInputs");
const projectRoutes = (0, express_1.Router)();
exports.projectRoutes = projectRoutes;
projectRoutes.post('/projects/create', verifyInputs_1.verifyInputs, new CreateProjectController_1.CreateProjectController().handle);
projectRoutes.get('/projects/getProjectsByUser', verifyInputs_1.verifyInputs, new GetProjectsByUserController_1.GetProjectsByUserController().handle);
projectRoutes.patch('/projects/addAdmin', verifyInputs_1.verifyInputs, new AddAdminToProjectController_1.AddAdminToProjectController().handle);
projectRoutes.delete('/projects/removeUser', verifyInputs_1.verifyInputs, new RemoveUserFromProjectController_1.RemoveUserFromProjectController().handle);
projectRoutes.patch('/projects/addUser', verifyInputs_1.verifyInputs, new AddUserToProjectController_1.AddUserToProjectController().handle);
