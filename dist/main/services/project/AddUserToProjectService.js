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
exports.AddUserToProjectService = void 0;
const client_1 = require("@prisma/client");
const CustomError_1 = require("../../errors/CustomError");
const prisma = new client_1.PrismaClient();
class AddUserToProjectService {
    execute(newUserName, projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = newUserName;
            if (!name) {
                throw new Error("The new user name must be provided");
            }
            if (!projectId) {
                throw new Error("The project ID must be provided");
            }
            const user = yield prisma.user.findUnique({
                where: { name: name },
            });
            if (!user) {
                throw new CustomError_1.CustomError('User not found', 404);
            }
            return yield prisma.project.update({
                where: { id: projectId },
                data: {
                    users: {
                        connect: { id: user.id },
                    },
                },
            });
        });
    }
}
exports.AddUserToProjectService = AddUserToProjectService;
