import { Request, Response } from 'express';
import { PrismaClient, Project, User } from '@prisma/client';

import { UserAuthenticator } from '../../services/UserAuthenticator';

import { GetSessionService } from '../../services/GetSessionService';


const prisma = new PrismaClient();
const userAuthenticator = new UserAuthenticator();
const getSessionService = new GetSessionService();

export class CreateTaskController {
    async handle(request: Request, response: Response) {
        const { sessionId, userName, userPassword, taskName, taskContent} = request.body;
        
        const user = userAuthenticator.authenticate(userName, userPassword) as User | null;;

        // Step 2: Check if the user exists 
        if (!user) {
            return response.status(401).json({ error: 'User not found' });
        } 

        // Step 1: Find the user by username
        const session = prisma.session.findUnique({
            where: { id: sessionId },
        });

        if (!session) {
            return response.status(404).json({ error: 'Session not found' });
        }

        // Step 3: Create a new task
        const newTask = await prisma.task.create({
            data: {
                sessionId: sessionId,
                name: taskName,
                content: taskContent, 
                isComplete: false,
            },
        });

        // Step 4: Add the task to the session
        const updatedSession = await prisma.session.update({
            where: { id: sessionId },
            data: {
                tasks: {
                    connect: { id: newTask.id },
                },
            },
        });

        return response.status(200).json(newTask);
        
    }
}
