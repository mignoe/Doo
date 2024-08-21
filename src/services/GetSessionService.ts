import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GetSessionService {
    public getSession(sessionId: string) {
        // Step 1: Find the user in the database
        const session = prisma.session.findUnique({
            where: { id: sessionId },
        });

       
    }
}