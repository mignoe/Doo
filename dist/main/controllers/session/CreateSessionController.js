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
exports.CreateSessionController = void 0;
const AuthenticateUserService_1 = require("../../services/user/AuthenticateUserService");
const VerifyProjectAdminService_1 = require("../../services/project/VerifyProjectAdminService");
const CreateSessionService_1 = require("../../services/session/CreateSessionService");
const CustomError_1 = require("../../errors/CustomError");
class CreateSessionController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { projectId, adminName, adminPassword, sessionName } = request.body;
            const authenticateUserService = new AuthenticateUserService_1.AuthenticateUserService();
            const verifyProjectAdminService = new VerifyProjectAdminService_1.VerifyProjectAdminService();
            const createSessionService = new CreateSessionService_1.CreateSessionService();
            try {
                // throw new Error([projectId, sessionName].join(' '));
                // Authenticate the user
                const admin = yield authenticateUserService.execute(adminName, adminPassword);
                // Verify if the user is an admin of the project
                yield verifyProjectAdminService.execute(admin.id, projectId);
                const session = yield createSessionService.execute(projectId, sessionName);
                return response.status(201).json({ message: 'Session created successfully.', id: session.id });
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    const statusCode = error.statusCode;
                    const message = error.message;
                    return response.status(statusCode).json({ error: message });
                }
                return response.status(500).json({ /*error: 'Failed to create session'*/ error: error.message });
            }
        });
    }
}
exports.CreateSessionController = CreateSessionController;
