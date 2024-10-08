// CompleteTaskService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CompleteTaskService {
    async execute(taskId: string) {
        return await prisma.task.update({
            where: { id: taskId },
            data: { isComplete: true },
        });
    }
}
