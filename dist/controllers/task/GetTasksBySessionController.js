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
exports.GetTasksBySessionController = void 0;
const GetTasksBySessionService_1 = require("../../services/task/GetTasksBySessionService");
class GetTasksBySessionController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sessionId } = request.params;
            const getTasksBySessionService = new GetTasksBySessionService_1.GetTasksBySessionService();
            try {
                const tasks = yield getTasksBySessionService.execute(sessionId);
                return response.status(200).json(tasks);
            }
            catch (error) {
                return response.status(500).json({ error: 'Failed to retrieve tasks' });
            }
        });
    }
}
exports.GetTasksBySessionController = GetTasksBySessionController;
