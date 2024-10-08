import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GetTasksBySessionService {
    async execute(sessionId: string) {
        return await prisma.task.findMany({
            where: { sessionId: sessionId },
        });
    }
}
