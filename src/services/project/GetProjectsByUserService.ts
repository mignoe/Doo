import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GetProjectsByUserService {
    async execute(userId: string) {
        return await prisma.project.findMany({
            where: {
                OR: [
                    { users: { some: { id: userId } } },
                    { admins: { some: { id: userId } } },
                ],
            },
            include: {
                users: true,
                admins: true,
            },
        });
    }
}