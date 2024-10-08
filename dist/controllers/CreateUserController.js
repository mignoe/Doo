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
exports.CreateUserController = void 0;
const client_1 = require("@prisma/client");
class CreateUserController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password } = request.body;
            const prismaClient = new client_1.PrismaClient();
            // autentifica o usuário
            const existingUser = yield prismaClient.user.findFirst({
                where: {
                    name: name
                }
            });
            if (existingUser) {
                // User already exists
                return response.status(409).json({ error: 'User already exists' });
            }
            const user = yield prismaClient.user.create({
                data: {
                    name,
                    password
                }
            });
            return response.json(user);
        });
    }
}
exports.CreateUserController = CreateUserController;
