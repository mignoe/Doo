import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { AuthenticationError } from '../../errors/AuthenticationError';

const prisma = new PrismaClient();

export class AuthenticateUserService {
    async execute(name: string, password: string) {
        
        const password_hash = await bcrypt.hash(password, 8);

        const user = await prisma.user.findUnique({
            where: { name },
        });

        if (!user || user.password_hash !== password_hash) {
            throw new AuthenticationError();
        }

        return user;
    }
}
