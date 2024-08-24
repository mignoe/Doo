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
exports.AddUserToProjectController = void 0;
const AddUserToProjectService_1 = require("../../services/project/AddUserToProjectService");
const AuthenticateUserService_1 = require("../../services/user/AuthenticateUserService");
const VerifyProjectAdminService_1 = require("../../services/project/VerifyProjectAdminService");
class AddUserToProjectController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newUserName, projectId, adminName, adminPassword } = req.body;
            const authenticateUserService = new AuthenticateUserService_1.AuthenticateUserService();
            const verifyAdminService = new VerifyProjectAdminService_1.VerifyProjectAdminService();
            try {
                const admin = yield authenticateUserService.execute(adminName, adminPassword);
                const isAdmin = yield verifyAdminService.execute(admin.id, projectId);
                if (!isAdmin) {
                    return res.status(403).json({ error: 'Either the projectId is wrong or you are not an admin from this project' });
                }
                const addUserToProjectService = new AddUserToProjectService_1.AddUserToProjectService();
                yield addUserToProjectService.execute(newUserName, projectId);
                res.status(200).json({ message: 'User added to project successfully' });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.AddUserToProjectController = AddUserToProjectController;
