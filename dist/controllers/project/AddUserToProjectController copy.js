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
exports.RemoveUserFromProjectController = void 0;
const RemoveUserFromProjectService_1 = require("../../services/project/RemoveUserFromProjectService");
const AuthenticateUserService_1 = require("../../services/user/AuthenticateUserService");
const VerifyProjectAdminService_1 = require("../../services/project/VerifyProjectAdminService");
class RemoveUserFromProjectController {
    removeUserFromProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, projectId, adminName, adminPassword } = req.body;
            const authenticateUserService = new AuthenticateUserService_1.AuthenticateUserService();
            const verifyAdminService = new VerifyProjectAdminService_1.VerifyProjectAdminService();
            try {
                const admin = yield authenticateUserService.execute(adminName, adminPassword);
                const isAdmin = yield verifyAdminService.execute(admin.id, projectId);
                if (!isAdmin) {
                    return res.status(403).json({ error: 'Only project admins can remove users from the project' });
                }
                const removeUserFromProjectService = new RemoveUserFromProjectService_1.RemoveUserFromProjectService();
                yield removeUserFromProjectService.execute(userId, projectId);
                res.status(200).json({ message: 'User removed from project successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to remove user from project' });
            }
        });
    }
}
exports.RemoveUserFromProjectController = RemoveUserFromProjectController;
