import { PrismaClient } from '@prisma/client';

import { CustomError } from '../../errors/CustomError';

const prisma = new PrismaClient();

export class CreateSessionService {
    async execute(projectId: string, sessionName: string) {
        

        if (!projectId || projectId === undefined) {
            throw new CustomError('Project ID is required.', 400);
        }

        if (!sessionName || sessionName === undefined) {
            throw new CustomError('Session name is required.', 400);
        }

        return await prisma.session.create({
            data: {
                name: sessionName,
                ProjectId: projectId,
            },
        });
    }
}
