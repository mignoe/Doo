import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
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
        
        const password_hash = await bcrypt.hash(password, 8);

        return await prisma.user.create({
            data: {
                name,
                password_hash,
            },
        });
    }
}
