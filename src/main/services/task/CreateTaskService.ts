// CreateTaskService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CreateTaskService {
    async execute(sessionId: string, taskName: string, taskContent: string) {
        return await prisma.task.create({
            data: {
                sessionId: sessionId,
                name: taskName,
                content: taskContent,
                isComplete: false,
            },
        });
    }
}
