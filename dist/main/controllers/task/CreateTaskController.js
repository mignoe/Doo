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
const AuthenticateUserService_1 = require("../../services/user/AuthenticateUserService");
const GetSessionService_1 = require("../../services/session/GetSessionService");
const CreateTaskService_1 = require("../../services/task/CreateTaskService");
class CreateTaskController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sessionId, userName, userPassword, taskName, taskContent } = request.body;
            const authenticateUserService = new AuthenticateUserService_1.AuthenticateUserService();
            const getSessionService = new GetSessionService_1.GetSessionService();
            const createTaskService = new CreateTaskService_1.CreateTaskService();
            try {
                // Authenticate the user
                const user = yield authenticateUserService.execute(userName, userPassword);
                if (!user) {
                    return response.status(401).json({ error: 'Invalid credentials' });
                }
                // Verify if the session exists
                const session = yield getSessionService.execute(sessionId);
                if (!session) {
                    return response.status(404).json({ error: 'Session not found' });
                }
                // Create a new task
                const newTask = yield createTaskService.execute(sessionId, taskName, taskContent);
                return response.status(201).json({ id: newTask.id, message: 'Task created successfully.' });
            }
            catch (error) {
                return response.status(500).json({ error: error.message });
            }
        });
    }
}
exports.CreateTaskController = CreateTaskController;
