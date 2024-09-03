import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export class CreateUserService {
    async execute(name: string, password: string) {
        
        const existingUser = await prisma.user.findFirst({
            where: { name },
        });
        
        if (existingUser) {
            throw new Error('User already exists');
        }
        
        const password_hash = await bcrypt.hash(password, 8);

        return await prisma.user.create({
            data: {
                name,
                password_hash,
            },
        });
    }
}
