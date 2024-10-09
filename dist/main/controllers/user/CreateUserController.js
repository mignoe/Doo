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
const CreateUserService_1 = require("../../services/user/CreateUserService");
const CustomError_1 = require("../../errors/CustomError");
class CreateUserController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password } = request.body;
            if (!name || !password) {
                return response.status(500).json({ error: "Name or Password is required" });
            }
            const createUserService = new CreateUserService_1.CreateUserService();
            try {
                const user = yield createUserService.execute(name, password);
                return response.status(201).json(user);
            }
            catch (error) {
                if (error instanceof CustomError_1.CustomError) {
                    const statusCode = error.statusCode;
                    const message = error.message;
                    return response.status(statusCode).json({ error: message });
                }
                console.log(error);
                return response.status(500).json({ error: "Uknown error creating User" });
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
