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
exports.GetSessionsByProjectController = void 0;
const GetSessionsByProjectService_1 = require("../../services/session/GetSessionsByProjectService");
class GetSessionsByProjectController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { projectId } = request.query;
            if (!projectId || typeof projectId !== 'string') {
                return response.status(400).json({ error: 'Missing projectId' });
            }
            const getSessionsByProjectService = new GetSessionsByProjectService_1.GetSessionsByProjectService();
            try {
                const sessions = yield getSessionsByProjectService.execute(projectId);
                return response.status(200).json(sessions);
            }
            catch (error) {
                return response.status(500).json({ error: 'Failed to retrieve sessions' });
            }
        });
    }
}
exports.GetSessionsByProjectController = GetSessionsByProjectController;
