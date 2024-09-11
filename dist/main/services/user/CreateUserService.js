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
exports.CreateUserService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const CustomError_1 = require("../../errors/CustomError");
const prisma = new client_1.PrismaClient();
class CreateUserService {
    execute(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield prisma.user.findFirst({
                where: { name },
            });
            if (existingUser) {
                throw new CustomError_1.CustomError('User already exists', 400);
            }
            const password_hash = yield bcryptjs_1.default.hash(password, 8);
            return yield prisma.user.create({
                data: {
                    name,
                    password_hash,
                },
            });
        });
    }
}
exports.CreateUserService = CreateUserService;
