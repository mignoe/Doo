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
exports.GetProjectsByUserController = void 0;
const AuthenticateUserService_1 = require("../../services/user/AuthenticateUserService");
const GetProjectsByUserService_1 = require("../../services/project/GetProjectsByUserService");
class GetProjectsByUserController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password } = request.query;
            console.log('GetProjectsByUserController', name, password);
            if (!name || !password || typeof name !== 'string' || typeof password !== 'string') {
                return response.status(406).json({ error: 'Missing required fields' });
            }
            const authenticateUserService = new AuthenticateUserService_1.AuthenticateUserService();
            const getProjectsByUserService = new GetProjectsByUserService_1.GetProjectsByUserService();
            try {
                const user = yield authenticateUserService.execute(name, password);
                const projects = yield getProjectsByUserService.execute(user.id);
                return response.status(200).json({ "projects": projects });
            }
            catch (error) {
                return response.status(401).json({ error: error.message });
            }
        });
    }
}
exports.GetProjectsByUserController = GetProjectsByUserController;
