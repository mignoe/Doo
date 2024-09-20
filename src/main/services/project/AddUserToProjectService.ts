import { PrismaClient } from '@prisma/client';
import { CustomError } from '../../errors/CustomError';

const prisma = new PrismaClient();

export class AddUserToProjectService {
    async execute(newUserName: string, projectId: string) {
        const name = newUserName;

        if (!name) {
            throw new Error("The new user name must be provided");
        }

        if (!projectId) {
            throw new Error("The project ID must be provided");
        }

        const user = await prisma.user.findUnique({
            where: { name: name },
        });

        if (!user) {
            throw new CustomError('User not found', 404);
        }

        return await prisma.project.update({
            where: { id: projectId },
            data: {
                users: {
                    connect: { id: user.id },
                },
            },
        });
    }
}
