// CreateProjectController.ts
import { Request, Response } from 'express';
import { CreateProjectService } from '../../services/project/CreateProjectService';

export class CreateProjectController {
    async handle(request: Request, response: Response) {
        const { name, users, admins } = request.body;
        const createProjectService = new CreateProjectService();

        try {
            const project = await createProjectService.execute(name, users, admins);
            return response.status(201).json(project);
        } catch (error) {
            return response.status(500).json({ message: 'Error creating project', error: error});
        }
    }
}