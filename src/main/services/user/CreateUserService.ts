import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

// Create a SHA-256 hash

import { UserAlreadyExistsError } from '../../errors/UserAlreadyExistsError';

const prisma = new PrismaClient();

export class CreateUserService {
    async execute(name: string, password: string) {
        
        const existingUser = await prisma.user.findFirst({
            where: { name },
        });
        
        if (existingUser) {
            throw new UserAlreadyExistsError();
        }
        
        const password_hash = crypto.createHash('sha256').update(password).digest('hex');
        
        return await prisma.user.create({
            data: {
                name,
                password_hash,
            },
        });
    }
}
