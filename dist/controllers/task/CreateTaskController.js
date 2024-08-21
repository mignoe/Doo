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
exports.CreateTaskController = void 0;
const client_1 = require("@prisma/client");
const UserAuthenticator_1 = require("../../services/UserAuthenticator");
const GetSessionService_1 = require("../../services/GetSessionService");
const prisma = new client_1.PrismaClient();
const userAuthenticator = new UserAuthenticator_1.UserAuthenticator();
const getSessionService = new GetSessionService_1.GetSessionService();
class CreateTaskController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sessionId, userName, userPassword, taskName, taskContent } = request.body;
            const user = userAuthenticator.authenticate(userName, userPassword);
            ;
            // Step 2: Check if the user exists 
            if (!user) {
                return response.status(401).json({ error: 'User not found' });
            }
            // Step 1: Find the user by username
            const session = prisma.session.findUnique({
                where: { id: sessionId },
            });
            if (!session) {
                return response.status(404).json({ error: 'Session not found' });
            }
            // Step 3: Create a new task
            const newTask = yield prisma.task.create({
                data: {
                    sessionId: sessionId, // Associate the task with the session
                    name: taskName,
                    content: taskContent,
                    isComplete: false,
                },
            });
            return response.status(200).json(newTask);
        });
    }
}
exports.CreateTaskController = CreateTaskController;
