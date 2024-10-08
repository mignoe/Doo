import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GetSessionService {
    async execute(sessionId: string) {
        return await prisma.session.findUnique({
            where: { id: sessionId },
        });
    }
}