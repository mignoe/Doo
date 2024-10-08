import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RemoveUserFromProjectService {
    async execute(userName: string, projectId: string) {
        return await prisma.project.update({
            where: { id: projectId },
            data: {
                users: {
                    disconnect: { name: userName },
                },
            },
        });
    }
}
