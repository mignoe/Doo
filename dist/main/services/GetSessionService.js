"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSessionService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class GetSessionService {
    getSession(sessionId) {
        // Step 1: Find the user in the database
        const session = prisma.session.findUnique({
            where: { id: sessionId },
        });
    }
}
exports.GetSessionService = GetSessionService;
