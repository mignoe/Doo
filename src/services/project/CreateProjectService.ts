// CreateProjectService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CreateProjectService {
    async execute(name: string, usersNames: string[], adminsNames: string[]) {
        return await prisma.project.create({
            data: {
                name,
                users: {
                    connect: usersNames.map((userName: string) => ({ name: userName })),
                },
                admins: {
                    connect: adminsNames.map((adminName: string) => ({ name: adminName })),
                },
            },
        });
    }
}