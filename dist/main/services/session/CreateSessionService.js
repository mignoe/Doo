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
exports.CreateSessionService = void 0;
const client_1 = require("@prisma/client");
const CustomError_1 = require("../../errors/CustomError");
const prisma = new client_1.PrismaClient();
class CreateSessionService {
    execute(projectId, sessionName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!projectId || projectId === undefined) {
                throw new CustomError_1.CustomError('Project ID is required.', 400);
            }
            if (!sessionName || sessionName === undefined) {
                throw new CustomError_1.CustomError('Session name is required.', 400);
            }
            return yield prisma.session.create({
                data: {
                    name: sessionName,
                    ProjectId: projectId,
                },
            });
        });
    }
}
exports.CreateSessionService = CreateSessionService;
