import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DeleteAllSessionsFromProjectService {
    async execute(projectId: string) {
        return await prisma.session.deleteMany({
            where: { ProjectId: projectId },
        });
    }
}
