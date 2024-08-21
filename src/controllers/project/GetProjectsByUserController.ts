import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GetProjectsByUser {
    async handle(request: Request, response: Response) {
        const { name, password } = request.body;

        // Step 1: Find the user by username
        const user = await prisma.user.findUnique({
            where: { name },
        });

        // Step 2: Check if the user exists and the password matches
        if (!user || user.password !== password) {
            return response.status(401).json({ error: 'Invalid username or password' });
        }

        // Step 3: Fetch all projects associated with the authenticated user
        const projects = await prisma.project.findMany({
            where: {
                OR: [
                    { users: { some: { id: user.id } } },
                    { admins: { some: { id: user.id } } },
                ],
            },
            include: {
                users: true,
                admins: true,
            },
        });

        return response.status(200).json(projects);
        
    }
}
