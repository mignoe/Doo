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
exports.AddAdminToProjectService = void 0;
const client_1 = require("@prisma/client");
const UserAccessDeniedError_1 = require("../../errors/UserAccessDeniedError");
const prisma = new client_1.PrismaClient();
class AddAdminToProjectService {
    execute(newAdminName, projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield prisma.user.findUnique({
                where: { name: newAdminName },
            });
            if (!admin) {
                throw new UserAccessDeniedError_1.UserAccessDeniedError();
            }
            return yield prisma.project.update({
                where: { id: projectId },
                data: {
                    admins: {
                        connect: { id: admin.id },
                    },
                },
            });
        });
    }
}
exports.AddAdminToProjectService = AddAdminToProjectService;
