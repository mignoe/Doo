import { PrismaClient } from '@prisma/client';
import { InvalidCredentialsError } from '../../errors/AuthenticationError';

const prisma = new PrismaClient();

export class AuthenticateUserService {
    async execute(name: string, password: string) {
        const user = await prisma.user.findUnique({
            where: { name },
        });

        if (!user || user.password !== password) {
            throw new InvalidCredentialsError();
        }

        return user;
    }
}
