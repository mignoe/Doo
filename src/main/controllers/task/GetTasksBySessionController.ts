// GetTasksBySessionController.ts
import { Request, Response } from 'express';
import { GetTasksBySessionService } from '../../services/task/GetTasksBySessionService';

export class GetTasksBySessionController {
    async handle(request: Request, response: Response) {
        const { sessionId } = request.body;
        const getTasksBySessionService = new GetTasksBySessionService();

        try {
            if (!sessionId || typeof sessionId !== 'string') {
                return response.status(400).json({ error: 'SessionId (string) is required' });
            }

            const tasks = await getTasksBySessionService.execute(sessionId);
            return response.status(200).json(tasks);
        } catch (error) {
            return response.status(500).json({ error: 'Failed to retrieve tasks' });
        }
    }
}
