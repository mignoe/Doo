import { Request, Response } from 'express';
import { AuthenticateUserService } from '../../services/user/AuthenticateUserService';
import { VerifyProjectAdminService } from '../../services/project/VerifyProjectAdminService';
import { CreateSessionService } from '../../services/session/CreateSessionService';

import { CustomError } from '../../errors/CustomError';

export class CreateSessionController {
    async handle(request: Request, response: Response) {
        const { projectId, adminName, adminPassword, sessionName } = request.body;
        const authenticateUserService = new AuthenticateUserService();
        const verifyProjectAdminService = new VerifyProjectAdminService();
        const createSessionService = new CreateSessionService();

        try {
            // throw new Error([projectId, sessionName].join(' '));
            // Authenticate the user
            const admin = await authenticateUserService.execute(adminName, adminPassword);

            // Verify if the user is an admin of the project
            await verifyProjectAdminService.execute(admin.id, projectId);
        
            const session = await createSessionService.execute(projectId, sessionName);

            return response.status(201).json({ message: 'Session created successfully.', id: session.id });
        } catch (error : any) {

            if (error instanceof CustomError) {
                const statusCode = error.statusCode;
                const message = error.message;

                return response.status(statusCode).json({ error: message });
            }

            return response.status(500).json({ /*error: 'Failed to create session'*/error: error.message });
        }
    }
}
