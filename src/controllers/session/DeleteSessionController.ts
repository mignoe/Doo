// DeleteSessionController.ts
import { Request, Response } from 'express';
import { AuthenticateUserService } from '../../services/user/AuthenticateUserService';
import { VerifyProjectAdminService } from '../../services/project/VerifyProjectAdminService';
import { DeleteAllTasksFromSessionService } from '../../services/task/DeleteAllTasksFromSessionService';
import { DeleteSessionService } from '../../services/session/DeleteSessionService';
import { VerifySessionBelongsToProjectService } from '../../services/session/VerifySessionBelongsToProjectService';


export class DeleteSessionController {
    async handle(request: Request, response: Response) {
        const { sessionId, projectId, adminName, adminPassword } = request.body;
        const authenticateUserService = new AuthenticateUserService();
        const verifyProjectAdminService = new VerifyProjectAdminService();
        const verifySessionBelongsToProjectService = new VerifySessionBelongsToProjectService();
        const deleteAllTasksFromSessionService = new DeleteAllTasksFromSessionService();
        const deleteSessionService = new DeleteSessionService();

        try {
            // Authenticate the user
            const admin = await authenticateUserService.execute(adminName, adminPassword);

            // Verify if the user is an admin of the project
            const isAdmin = await verifyProjectAdminService.execute(admin.id, projectId);
            if (!isAdmin) {
                return response.status(403).json({ error: 'Either the projectId is wrong or you are not an admin from this project' });
            }

            // Verify if the session belongs to the project
            const sessionBelongsToProject = verifySessionBelongsToProjectService.execute(sessionId, projectId);
            if (!sessionBelongsToProject) {
                return response.status(403).json({ error: 'Session does not belong to the project' });
            }

            // First we need to delete all the tasks within the session
            await deleteAllTasksFromSessionService.execute(sessionId);

            // Delete the session
            await deleteSessionService.execute(sessionId);

            return response.status(200).json({ message: 'Session deleted successfully' });
        } catch (error : any) {
            return response.status(500).json({ error: error.message });
        }
    }
}
