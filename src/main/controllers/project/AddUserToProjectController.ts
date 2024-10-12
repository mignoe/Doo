import { Request, Response } from 'express';
import { AddUserToProjectService } from '../../services/project/AddUserToProjectService';
import { AuthenticateUserService } from '../../services/user/AuthenticateUserService';
import { VerifyProjectAdminService } from '../../services/project/VerifyProjectAdminService';


export class AddUserToProjectController {
    async handle(req: Request, res: Response) {
        const { newUserName, projectId, adminName, adminPassword } = req.body;
        const authenticateUserService = new AuthenticateUserService();
        const verifyAdminService = new VerifyProjectAdminService();

        try {

            const admin = await authenticateUserService.execute(adminName, adminPassword);

           await verifyAdminService.execute(admin.id, projectId);
        

            const addUserToProjectService = new AddUserToProjectService();
            await addUserToProjectService.execute(newUserName, projectId);

            res.status(200).json({ message: 'User added to the project successfully.' });
        } catch (error : any) {
            console.log("Error trying to add user to proejct for user:", adminName, "\n", error)

            res.status(500).json({ error: error.message });
        }
    }
}
