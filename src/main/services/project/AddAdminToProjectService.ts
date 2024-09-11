import { PrismaClient } from '@prisma/client';
import { UserAccessDeniedError } from '../../errors/UserAccessDeniedError';

const prisma = new PrismaClient();

export class AddAdminToProjectService {
    async execute(newAdminName: string, projectId: string) {
        const admin = await prisma.user.findUnique({
            where: { name: newAdminName },
        });

        if (!admin) {
            throw new UserAccessDeniedError();
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
