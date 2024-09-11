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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AuthenticationError_1 = require("../../errors/AuthenticationError");
const prisma = new client_1.PrismaClient();
class AuthenticateUserService {
    execute(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const password_hash = yield bcryptjs_1.default.hash(password, 8);
            const user = yield prisma.user.findUnique({
                where: { name },
            });
            if (!user || user.password_hash !== password_hash) {
                throw new Error('Invalid username or password');
            }
            if (!user || user.password_hash !== password_hash) {
                throw new AuthenticationError_1.InvalidCredentialsError();
            }
            return user;
        });
    }
}
exports.AuthenticateUserService = AuthenticateUserService;
