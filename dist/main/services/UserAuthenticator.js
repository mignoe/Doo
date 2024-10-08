"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthenticator = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserAuthenticator {
    authenticate(name, password) {
        // Step 1: Find the user in the database
        const user = prisma.user.findUnique({
            where: { name: name },
        });
        //    if (user.password !== password) {
        //          return null;
        //        }
        // Step 2: Check if the user exists 
        if (!user) {
            return null;
        }
        return user;
    }
}
exports.UserAuthenticator = UserAuthenticator;
