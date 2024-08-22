// CreateProjectService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CreateProjectService {
    async execute(name: string, users: string[], admins: string[]) {
        return await prisma.project.create({
            data: {
                name,
                users: {
                    connect: users.map((userId: string) => ({ id: userId })),
                },
                admins: {
                    connect: admins.map((adminId: string) => ({ id: adminId })),
                },
            },
        });
    }
}