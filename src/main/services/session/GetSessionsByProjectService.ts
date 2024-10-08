
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GetSessionsByProjectService {
    async execute(projectId: string) {
        return await prisma.session.findMany({
            where: { ProjectId: projectId },
        });
    }
}
