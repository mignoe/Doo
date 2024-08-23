import { Request, Response } from 'express';
import { AuthenticateUserService } from '../../services/user/AuthenticateUserService';
import { VerifyProjectAdminService } from '../../services/project/VerifyProjectAdminService';
import { CreateSessionService } from '../../services/session/CreateSessionService';

export class CreateSessionController {
    async handle(request: Request, response: Response) {
        const { projectId, adminName, adminPassword, sessionName } = request.body;
        const authenticateUserService = new AuthenticateUserService();
        const verifyProjectAdminService = new VerifyProjectAdminService();
        const createSessionService = new CreateSessionService();

        try {
            // Authenticate the user
            const admin = await authenticateUserService.execute(adminName, adminPassword);

            // Verify if the user is an admin of the project
            const isAdmin = await verifyProjectAdminService.execute(admin.id, projectId);
            if (!isAdmin) {
                return response.status(403).json({ error: 'Either the projectId is wrong or you are not an admin from this project' });
            }

            const session = await createSessionService.execute(projectId, sessionName);

            return response.status(200).json(session);
        } catch (error) {
            return response.status(500).json({ error: 'Failed to create session' });
        }
    }
}
