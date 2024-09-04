import { PrismaClient } from '@prisma/client';
import { CustomError } from '../../errors/CustomError';

const prisma = new PrismaClient();

export class CreateUserService {
    async execute(name: string, password: string) {
        const existingUser = await prisma.user.findFirst({
            where: { name },
        });

        if (existingUser) {
            throw new CustomError('User already exists', 400);
        }

        return await prisma.user.create({
            data: {
                name,
                password,
            },
        });
    }
}
