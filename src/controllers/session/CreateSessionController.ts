import { Request, Response } from 'express';
import { PrismaClient, Project, User } from '@prisma/client';

import { UserAuthenticator } from '../../services/UserAuthenticator';


const prisma = new PrismaClient();
const userAuthenticator = new UserAuthenticator();

export class CreateSessionController {
    async handle(request: Request, response: Response) {
        const { projectId, userName, userPassword, sessionName } = request.body;
        
        //const user = userAuthenticator.authenticate(userName, userPassword) as User | null;;
        //const user = prisma.user.findUnique({
        //    where: {name: userName},
        //}) as User;

        // Step 2: Check if the user exists 
        //if (!user || !user.id) {
        //    return response.status(401).json({ error: 'User not found', data: userName });
        //} 

        // Step 1: Find the user by username
        const project = await prisma.project.findUnique({
            where: { id: projectId},
            include: {
                admins: true, // Include admins in the query
            }
        });

        if (!project) {
            return response.status(404).json({ error: 'Project not found' });
        }

//        const admins = project.admins as User[]
//        const isAdmin = admins.some((admin: User) => admin.id === user.id);
//        
//        if (!isAdmin) {
//            return response.status(401).json({ error: 'User is not an admin', data: { user, admins } });
//        }

        const session = await prisma.session.create({
            data: {
                name: sessionName,
                ProjectId: project.id, // Ensure this project ID exists
            },
        });

        return response.status(200).json(session);
        
    }
}
