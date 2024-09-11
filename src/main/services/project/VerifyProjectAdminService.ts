import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class VerifyProjectAdminService {
    async execute(userId: string, projectId: string): Promise<boolean> {
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                admins: {
                    some: { id: userId },
                },
            },
        });

        return project !== null;
    }
}
