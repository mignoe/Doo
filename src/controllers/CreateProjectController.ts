import { Request, Response } from 'express'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new project
export class CreateProjectController {
    async handle(request: Request, response: Response) {

        const { name, users, admins } = request.body;
        
        const project = await prisma.project.create({
            data: {
                name,
                users: {
                    connect: users.map((userId : string) => ({ id: userId })),
                },
                admins: {
                    connect: admins.map((adminId : string) => ({ id: adminId })),
                },
            },
        });

        if (!project) {
            return response.status(404).json({ error: 'Project not found' });
        }

        return response.status(201).json(project);

    }
}
