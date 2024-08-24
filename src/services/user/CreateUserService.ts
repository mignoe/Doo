import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CreateUserService {
    async execute(name: string, password: string) {
        const existingUser = await prisma.user.findFirst({
            where: { name },
        });

        if (existingUser) {
            throw new Error('User already exists');
        }

        return await prisma.user.create({
            data: {
                name,
                password,
            },
        });
    }
}
