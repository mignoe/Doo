import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AddUserToProjectService {
    async execute(newUserName: string, projectId: string) {
        const user = await prisma.user.findUnique({
            where: { name: newUserName },
        });

        if (!user) {
            throw new Error('User not found');
        }

        return await prisma.project.update({
            where: { id: projectId },
            data: {
                users: {
                    connect: { id: user.id },
                },
            },
        });
    }
}
