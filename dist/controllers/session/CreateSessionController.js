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
const client_1 = require("@prisma/client");
const UserAuthenticator_1 = require("../../services/UserAuthenticator");
const prisma = new client_1.PrismaClient();
const userAuthenticator = new UserAuthenticator_1.UserAuthenticator();
class CreateSessionController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { projectId, userName, userPassword, sessionName } = request.body;
            //const user = userAuthenticator.authenticate(userName, userPassword) as User | null;;
            //const user = prisma.user.findUnique({
            //    where: {name: userName},
            //}) as User;
            // Step 2: Check if the user exists 
            //if (!user || !user.id) {
            //    return response.status(401).json({ error: 'User not found', data: userName });
            //} 
            // Step 1: Find the user by username
            const project = yield prisma.project.findUnique({
                where: { id: projectId },
                include: {
                    admins: true, // Include admins in the query
                }
            });
            if (!project) {
                return response.status(404).json({ error: 'Project not found' });
            }
            //        const admins = project.admins as User[]
            //        const isAdmin = admins.some((admin: User) => admin.id === user.id);
            //        
            //        if (!isAdmin) {
            //            return response.status(401).json({ error: 'User is not an admin', data: { user, admins } });
            //        }
            const session = yield prisma.session.create({
                data: {
                    name: sessionName,
                    ProjectId: project.id, // Ensure this project ID exists
                },
            });
            return response.status(200).json(session);
        });
    }
}
exports.CreateSessionController = CreateSessionController;
