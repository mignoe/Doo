// CreateProjectController.ts
import { Request, Response } from 'express';
import { CreateProjectService } from '../../services/project/CreateProjectService';
import { CustomError } from '../../errors/CustomError';

export class CreateProjectController {
    async handle(request: Request, response: Response) {
        const { name, usersNames, adminsNames } = request.body;
        const createProjectService = new CreateProjectService();

        try {
            if (adminsNames.length === 0) {
                return response.status(400).json({ message: 'At least one admin is required' });
            }
            const project = await createProjectService.execute(name, usersNames, adminsNames);
            return response.status(201).json(project);
        } catch (error : any) {
            
            if (error instanceof CustomError) {
                const statusCode = error.statusCode;
                const message = error.message;

                return response.status(statusCode).json({ error: message });
            }

            return response.status(500).json({ error: 'Unknown error creating project'});
        }
    }
}