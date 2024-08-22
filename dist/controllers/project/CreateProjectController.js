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
const CreateProjectService_1 = require("../../services/project/CreateProjectService");
class CreateProjectController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, users, admins } = request.body;
            const createProjectService = new CreateProjectService_1.CreateProjectService();
            try {
                const project = yield createProjectService.execute(name, users, admins);
                return response.status(201).json(project);
            }
            catch (error) {
                return response.status(500).json({ message: 'Error creating project', error: error });
            }
        });
    }
}
exports.CreateProjectController = CreateProjectController;
