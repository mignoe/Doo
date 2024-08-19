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
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// Create a new project
class CreateProjectController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, users, admins } = request.body;
            const project = yield prisma.project.create({
                data: {
                    name,
                    users: {
                        connect: users.map((userId) => ({ id: userId })),
                    },
                    admins: {
                        connect: admins.map((adminId) => ({ id: adminId })),
                    },
                },
            });
            if (!project) {
                return response.status(404).json({ error: 'Project not found' });
            }
            return response.status(201).json(project);
        });
    }
}
exports.CreateProjectController = CreateProjectController;
