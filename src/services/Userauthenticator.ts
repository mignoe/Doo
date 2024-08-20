import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserAuthenticator {
    public authenticate(name: string, password: string) {
        // Step 1: Find the user in the database
        const user = prisma.user.findUnique({
            where: { name, password },
        });

        // Step 2: Check if the user exists 
        if (!user) {
            return null;
        }

        return user;
    }
}