// CreateTaskController.ts
import { Request, Response } from 'express';
import { AuthenticateUserService } from '../../services/user/AuthenticateUserService';
import { GetSessionService } from '../../services/session/GetSessionService';
import { CreateTaskService } from '../../services/task/CreateTaskService';

export class CreateTaskController {
    async handle(request: Request, response: Response) {
        const { sessionId, userName, userPassword, taskName, taskContent } = request.body;
        const authenticateUserService = new AuthenticateUserService();
        const getSessionService = new GetSessionService();
        const createTaskService = new CreateTaskService();

        try {
            // Authenticate the user
            const user = await authenticateUserService.execute(userName, userPassword);

            // Verify if the session exists
            const session = await getSessionService.execute(sessionId);
            if (!session) {
                return response.status(404).json({ error: 'Session not found' });
            }

            // Create a new task
            const newTask = await createTaskService.execute(sessionId, taskName, taskContent);

            return response.status(200).json(newTask);
        } catch (error) {
            return response.status(500).json({ error: 'Failed to create task' });
        }
    }
}
