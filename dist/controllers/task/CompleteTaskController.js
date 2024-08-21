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
exports.CompleteTaskController = void 0;
const client_1 = require("@prisma/client");
const UserAuthenticator_1 = require("../../services/UserAuthenticator");
const GetSessionService_1 = require("../../services/GetSessionService");
const prisma = new client_1.PrismaClient();
const userAuthenticator = new UserAuthenticator_1.UserAuthenticator();
const getSessionService = new GetSessionService_1.GetSessionService();
class CompleteTaskController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { taskId, userName, userPassword } = request.body;
            const user = userAuthenticator.authenticate(userName, userPassword);
            ;
            // Step 2: Check if the user exists 
            if (!user) {
                return response.status(401).json({ error: 'User not found' });
            }
            // Step 1: Find the user by username
            const task = prisma.task.findUnique({
                where: { id: taskId },
            });
            if (!task) {
                return response.status(404).json({ error: 'Task not found' });
            }
            // Step 3: Update the task's isComplete attribute in the database
            const updatedTask = yield prisma.task.update({
                where: { id: taskId },
                data: { isComplete: true },
            });
            return response.json(updatedTask);
        });
    }
}
exports.CompleteTaskController = CompleteTaskController;
