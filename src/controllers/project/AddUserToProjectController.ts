import { Request, Response } from 'express';
import { AddUserToProjectService } from '../../services/project/AddUserToProjectService';
import { AuthenticateUserService } from '../../services/user/AuthenticateUserService';
import { VerifyProjectAdminService } from '../../services/project/VerifyProjectAdminService';

export class AddUserToProjectController {
    async handle(req: Request, res: Response) {
        const { userId, projectId, adminName, adminPassword } = req.body;
        const authenticateUserService = new AuthenticateUserService();
        const verifyAdminService = new VerifyProjectAdminService();

        try {
            const admin = await authenticateUserService.execute(adminName, adminPassword);

            const isAdmin = await verifyAdminService.execute(admin.id, projectId);
            if (!isAdmin) {
                return res.status(403).json({ error: 'Only project admins can add users to the project' });
            }

            const addUserToProjectService = new AddUserToProjectService();
            await addUserToProjectService.execute(userId, projectId);

            res.status(200).json({ message: 'User added to project successfully' });
        } catch (error : any) {
            res.status(500).json({ error: 'Failed to add user to project' });
        }
    }
}
