import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AddAdminToProjectService {
    async execute(newAdminId: string, projectId: string) {
        return await prisma.project.update({
            where: { id: projectId },
            data: {
                admins: {
                    connect: { id: newAdminId },
                },
            },
        });
    }
}
