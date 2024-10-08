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
exports.CreateProjectService = void 0;
// CreateProjectService.ts
const client_1 = require("@prisma/client");
const AtLeastOneAdminError_1 = require("../../errors/proejct/AtLeastOneAdminError");
const prisma = new client_1.PrismaClient();
class CreateProjectService {
    execute(name, usersNames, adminsNames) {
        return __awaiter(this, void 0, void 0, function* () {
            if (adminsNames === undefined || adminsNames.length === 0) {
                throw new AtLeastOneAdminError_1.AtLeastOneAdminError();
            }
            return yield prisma.project.create({
                data: {
                    name,
                    users: {
                        connect: usersNames.map((userName) => ({ name: userName })),
                    },
                    admins: {
                        connect: adminsNames.map((adminName) => ({ name: adminName })),
                    },
                },
            });
        });
    }
}
exports.CreateProjectService = CreateProjectService;
