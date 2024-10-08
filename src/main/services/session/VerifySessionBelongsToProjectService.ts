import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class VerifySessionBelongsToProjectService {
    async execute(sessionId: string, projectId: string): Promise<boolean> {
        const session = await prisma.session.findFirst({
            where: {
                id: sessionId,
                ProjectId: projectId,
            },
        });

        return session !== null;
    }
}
