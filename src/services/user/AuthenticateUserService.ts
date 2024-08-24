import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthenticateUserService {
    async execute(name: string, password: string) {
        const user = await prisma.user.findUnique({
            where: { name },
        });

        if (!user || user.password !== password) {
            throw new Error('Invalid username or password');
        }

        return user;
    }
}
