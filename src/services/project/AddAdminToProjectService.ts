import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AddAdminToProjectService {
    async execute(newAdminName: string, projectId: string) {
        const admin = await prisma.user.findUnique({
            where: { name: newAdminName },
        });

        if (!admin) {
            throw new Error('Admin not found');
        }

        return await prisma.project.update({
            where: { id: projectId },
            data: {
                admins: {
                    connect: { id: admin.id },
                },
            },
        });
    }
}
