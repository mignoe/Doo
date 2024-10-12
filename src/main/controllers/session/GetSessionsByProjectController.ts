
import { Request, Response } from 'express';
import { GetSessionsByProjectService } from '../../services/session/GetSessionsByProjectService';

export class GetSessionsByProjectController {
    async handle(request: Request, response: Response) {
        const { projectId } = request.query;
        if (!projectId || typeof projectId !== 'string') {
            return response.status(400).json({ error: 'Missing projectId' });
        }

        const getSessionsByProjectService = new GetSessionsByProjectService();

        try {
            const sessions = await getSessionsByProjectService.execute(projectId);
            return response.status(200).json(sessions);
        } catch (error) {
            return response.status(500).json({ error: 'Failed to retrieve sessions' });
        }
    }
}
