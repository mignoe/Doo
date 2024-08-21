import { Request, Response } from 'express';
import { PrismaClient, Project, User } from '@prisma/client';

import { UserAuthenticator } from '../../services/UserAuthenticator';

import { GetSessionService } from '../../services/GetSessionService';


const prisma = new PrismaClient();
const userAuthenticator = new UserAuthenticator();
const getSessionService = new GetSessionService();

export class CompleteTaskController {
    async handle(request: Request, response: Response) {
        const { taskId, userName, userPassword } = request.body;
        
        const user = userAuthenticator.authenticate(userName, userPassword) as User | null;;

        // Step 2: Check if the user exists 
        if (!user) {
            return response.status(401).json({ error: 'User not found' });
        } 

        // Step 1: Find the user by username
        const task = prisma.task.findUnique({
            where: { id: taskId },
        });

        if (!task) {
            return response.status(404).json({ error: 'Task not found' });
        }

        // Step 3: Update the task's isComplete attribute in the database
        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: { isComplete: true },
        });

        return response.json(updatedTask);
    
    }
}