import { PrismaClient } from '@prisma/client';
import { UserAccessDeniedError } from '../../errors/UserAccessDeniedError';

const prisma = new PrismaClient();

export class VerifyProjectAdminService {
    async execute(userId: string, projectId: string) {
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                admins: {
                    some: { id: userId },
                },
            },
        });

        if (project === null) {
            throw new UserAccessDeniedError();
        }
    }
}
