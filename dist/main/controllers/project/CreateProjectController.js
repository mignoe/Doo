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
const CustomError_1 = require("../../errors/CustomError");
class CreateProjectController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, usersNames, adminsNames } = request.body;
            const createProjectService = new CreateProjectService_1.CreateProjectService();
            try {
                if (adminsNames.length === 0) {
                    return response.status(400).json({ message: 'At least one admin is required' });
                }
                const project = yield createProjectService.execute(name, usersNames, adminsNames);
                return response.status(201).json(project);
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    const statusCode = error.statusCode;
                    const message = error.message;
                    return response.status(statusCode).json({ error: message });
                }
                return response.status(500).json({ error: 'Unknown error creating project' });
            }
        });
    }
}
exports.CreateProjectController = CreateProjectController;
