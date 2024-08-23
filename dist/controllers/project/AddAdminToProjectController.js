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
exports.AddAdminToProjectController = void 0;
const AddAdminToProjectService_1 = require("../../services/project/AddAdminToProjectService");
const AuthenticateUserService_1 = require("../../services/user/AuthenticateUserService");
const VerifyProjectAdminService_1 = require("../../services/project/VerifyProjectAdminService");
class AddAdminToProjectController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newAdminId, projectId, adminName, adminPassword } = req.body;
            const authenticateUserService = new AuthenticateUserService_1.AuthenticateUserService();
            const verifyAdminService = new VerifyProjectAdminService_1.VerifyProjectAdminService();
            const addAdminToProjectService = new AddAdminToProjectService_1.AddAdminToProjectService();
            try {
                const admin = yield authenticateUserService.execute(adminName, adminPassword);
                const isAdmin = yield verifyAdminService.execute(admin.id, projectId);
                if (!isAdmin) {
                    return res.status(403).json({ error: 'Only project admins can add admins to the project' });
                }
                yield addAdminToProjectService.execute(newAdminId, projectId);
                res.status(200).json({ message: 'Admin added to project successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to add admin to project', error: error.message });
            }
        });
    }
}
exports.AddAdminToProjectController = AddAdminToProjectController;
