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
const CompleteTaskService_1 = require("../../services/task/CompleteTaskService");
class CompleteTaskController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { taskId } = request.body;
            const completeTaskService = new CompleteTaskService_1.CompleteTaskService();
            try {
                const updatedTask = yield completeTaskService.execute(taskId);
                return response.status(200).json(updatedTask);
            }
            catch (error) {
                return response.status(500).json({ error: 'Failed to complete task', fullError: error.message });
            }
        });
    }
}
exports.CompleteTaskController = CompleteTaskController;
