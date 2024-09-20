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
const crypto_1 = __importDefault(require("crypto"));
// Create a SHA-256 hash
const UserAlreadyExistsError_1 = require("../../errors/UserAlreadyExistsError");
const prisma = new client_1.PrismaClient();
class CreateUserService {
    execute(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield prisma.user.findFirst({
                where: { name },
            });
            if (existingUser) {
                throw new UserAlreadyExistsError_1.UserAlreadyExistsError();
            }
            const password_hash = crypto_1.default.createHash('sha256').update(password).digest('hex');
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
