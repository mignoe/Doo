"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectController = void 0;
const CreateProjectService_1 = require("../../services/project/CreateProjectService");
const CustomError_1 = require("../../errors/CustomError");
const AuthenticateUserService_1 = require("../../services/user/AuthenticateUserService");
class CreateProjectController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, usersNames, adminsNames, userName, userPassword } = request.body;
            const createProjectService = new CreateProjectService_1.CreateProjectService();
            const authenticatedUser = new AuthenticateUserService_1.AuthenticateUserService();
            try {
                yield authenticatedUser.execute(userName, userPassword);
                // console.log(name, usersNames, adminsNames, userName, userPassword);
                const project = yield createProjectService.execute(name, usersNames, adminsNames);
                return response.status(201).json({ message: "Project created successfully.", id: project.id });
            }
            catch (error) {
                console.error('Error creating project for user: ', userName, "with password", userPassword, error);
                if (error instanceof CustomError_1.CustomError) {
                    const statusCode = error.statusCode;
                    const message = error.message;
                    return response.status(statusCode).json({ error: message });
                }
                return response.status(500).json({ error: 'Unknown error creating project', message: error.message });
            }
        });
    }
}
exports.CreateProjectController = CreateProjectController;
