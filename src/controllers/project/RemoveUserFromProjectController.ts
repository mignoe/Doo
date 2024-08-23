import { Request, Response } from 'express';
import { RemoveUserFromProjectService } from '../../services/project/RemoveUserFromProjectService';
import { AuthenticateUserService } from '../../services/user/AuthenticateUserService';
import { VerifyProjectAdminService } from '../../services/project/VerifyProjectAdminService';

export class RemoveUserFromProjectController {
    async handle(req: Request, res: Response) {
        const { userName, projectId, adminName, adminPassword } = req.body;
        const authenticateUserService = new AuthenticateUserService();
        const verifyAdminService = new VerifyProjectAdminService();
        const removeUserFromProjectService = new RemoveUserFromProjectService();

        try {
            const admin = await authenticateUserService.execute(adminName, adminPassword);

            const isAdmin = await verifyAdminService.execute(admin.id, projectId);
            if (!isAdmin) {
                return res.status(403).json({ error: 'Either the projectId is wrong or you are not an admin from this project' });
            }

            await removeUserFromProjectService.execute(userName, projectId);

            res.status(200).json({ message: 'User removed from project successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to remove user from project' });
        }
    }
}

