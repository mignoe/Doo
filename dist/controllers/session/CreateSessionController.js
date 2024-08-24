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
class CreateSessionController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { projectId, adminName, adminPassword, sessionName } = request.body;
            const authenticateUserService = new AuthenticateUserService_1.AuthenticateUserService();
            const verifyProjectAdminService = new VerifyProjectAdminService_1.VerifyProjectAdminService();
            const createSessionService = new CreateSessionService_1.CreateSessionService();
            try {
                // Authenticate the user
                const admin = yield authenticateUserService.execute(adminName, adminPassword);
                // Verify if the user is an admin of the project
                const isAdmin = yield verifyProjectAdminService.execute(admin.id, projectId);
                if (!isAdmin) {
                    return response.status(403).json({ error: 'Either the projectId is wrong or you are not an admin from this project' });
                }
                const session = yield createSessionService.execute(projectId, sessionName);
                return response.status(200).json(session);
            }
            catch (error) {
                return response.status(500).json({ error: 'Failed to create session' });
            }
        });
    }
}
exports.CreateSessionController = CreateSessionController;
