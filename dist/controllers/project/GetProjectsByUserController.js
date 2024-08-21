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
exports.GetProjectsByUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class GetProjectsByUser {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password } = request.body;
            // Step 1: Find the user by username
            const user = yield prisma.user.findUnique({
                where: { name },
            });
            // Step 2: Check if the user exists and the password matches
            if (!user || user.password !== password) {
                return response.status(401).json({ error: 'Invalid username or password' });
            }
            // Step 3: Fetch all projects associated with the authenticated user
            const projects = yield prisma.project.findMany({
                where: {
                    OR: [
                        { users: { some: { id: user.id } } },
                        { admins: { some: { id: user.id } } },
                    ],
                },
                include: {
                    users: true,
                    admins: true,
                },
            });
            return response.status(200).json(projects);
        });
    }
}
exports.GetProjectsByUser = GetProjectsByUser;
