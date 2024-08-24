import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CreateSessionService {
    async execute(projectId: string, sessionName: string) {
        return await prisma.session.create({
            data: {
                name: sessionName,
                ProjectId: projectId,
            },
        });
    }
}
