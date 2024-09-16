// CreateProjectService.ts
import { PrismaClient } from '@prisma/client';
import { AtLeastOneAdminError } from '../../errors/proejct/AtLeastOneAdminError';

const prisma = new PrismaClient();

export class CreateProjectService {
    async execute(name: string, usersNames: string[], adminsNames: string[]) {

        if (adminsNames === undefined || adminsNames.length === 0) {
            throw new AtLeastOneAdminError();
        }

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