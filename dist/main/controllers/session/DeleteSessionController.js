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
exports.DeleteSessionController = void 0;
const AuthenticateUserService_1 = require("../../services/user/AuthenticateUserService");
const VerifyProjectAdminService_1 = require("../../services/project/VerifyProjectAdminService");
const DeleteAllTasksFromSessionService_1 = require("../../services/task/DeleteAllTasksFromSessionService");
const DeleteSessionService_1 = require("../../services/session/DeleteSessionService");
const VerifySessionBelongsToProjectService_1 = require("../../services/session/VerifySessionBelongsToProjectService");
class DeleteSessionController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sessionId, projectId, adminName, adminPassword } = request.body;
            const authenticateUserService = new AuthenticateUserService_1.AuthenticateUserService();
            const verifyProjectAdminService = new VerifyProjectAdminService_1.VerifyProjectAdminService();
            const verifySessionBelongsToProjectService = new VerifySessionBelongsToProjectService_1.VerifySessionBelongsToProjectService();
            const deleteAllTasksFromSessionService = new DeleteAllTasksFromSessionService_1.DeleteAllTasksFromSessionService();
            const deleteSessionService = new DeleteSessionService_1.DeleteSessionService();
            try {
                // Authenticate the user
                const admin = yield authenticateUserService.execute(adminName, adminPassword);
                // Verify if the user is an admin of the project
                verifyProjectAdminService.execute(admin.id, projectId);
                // Verify if the session belongs to the project
                const sessionBelongsToProject = verifySessionBelongsToProjectService.execute(sessionId, projectId);
                if (!sessionBelongsToProject) {
                    return response.status(403).json({ error: 'Session does not belong to the project' });
                }
                // First we need to delete all the tasks within the session
                yield deleteAllTasksFromSessionService.execute(sessionId);
                // Delete the session
                yield deleteSessionService.execute(sessionId);
                return response.status(200).json({ message: 'Session deleted successfully' });
            }
            catch (error) {
                return response.status(500).json({ error: error.message });
            }
        });
    }
}
exports.DeleteSessionController = DeleteSessionController;
