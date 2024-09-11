import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DeleteSessionService {
    async execute(sessionId: string) {
        return await prisma.session.delete({
            where: { id: sessionId },
        });
    }
}
