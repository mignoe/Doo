import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DeleteAllTasksFromSessionService {
    async execute(sessionId: string) {
        return await prisma.task.deleteMany({
            where: { sessionId: sessionId },
        });
    }
}
