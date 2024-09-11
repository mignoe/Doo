import { Request, Response } from 'express';
import { AddAdminToProjectService } from '../../services/project/AddAdminToProjectService';
import { AuthenticateUserService } from '../../services/user/AuthenticateUserService';
import { VerifyProjectAdminService } from '../../services/project/VerifyProjectAdminService';

export class AddAdminToProjectController {
    async handle(req: Request, res: Response) {
        const { newAdminName, projectId, adminName, adminPassword } = req.body;
        const authenticateUserService = new AuthenticateUserService();
        const verifyAdminService = new VerifyProjectAdminService();
        const addAdminToProjectService = new AddAdminToProjectService();

        try {
            const admin = await authenticateUserService.execute(adminName, adminPassword);
 
            const isAdmin = await verifyAdminService.execute(admin.id, projectId);

            if (!isAdmin) {
                return res.status(403).json({ error: 'Either the projectId is wrong or you are not an admin from this project' });
            }

 
            await addAdminToProjectService.execute(newAdminName, projectId);


            res.status(200).json({ message: 'Admin added to project successfully' });
        } catch (error : any) {
            res.status(500).json({ message: 'Failed to add admin to project', error: error.message });
        }
    }
}
