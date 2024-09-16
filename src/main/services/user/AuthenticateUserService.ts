import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

// Create a SHA-256 hash


import { AuthenticationError } from '../../errors/AuthenticationError';
import { CustomError } from '../../errors/CustomError';

const prisma = new PrismaClient();

export class AuthenticateUserService {
    async execute(name: string, password: string) {
        
        const password_hash = crypto.createHash('sha256').update(password).digest('hex');

        const user = await prisma.user.findUnique({
            where: { name },
        });

        if (!user || user.password_hash !== password_hash) {
            // throw new Error("1: " + password_hash + " 2: " + user?.password_hash + " 3: " + hash_again);
            throw new AuthenticationError();
        }

        return user;
    }
}
