// GetProjectsByUserController.ts
import { Request, Response } from 'express';
import { AuthenticateUserService } from '../../services/user/AuthenticateUserService';
import { GetProjectsByUserService } from '../../services/project/GetProjectsByUserService';

export class GetProjectsByUserController {
    async handle(request: Request, response: Response) {
        const { name, password } = request.query;
        
        console.log('GetProjectsByUserController', name, password);

        if (!name || !password || typeof name !== 'string' || typeof password !== 'string') {
            return response.status(406).json({ error: 'Missing required fields' });
        }

        const authenticateUserService = new AuthenticateUserService();
        const getProjectsByUserService = new GetProjectsByUserService();

        try {
            const user = await authenticateUserService.execute(name, password);
            const projects = await getProjectsByUserService.execute(user.id);
            return response.status(200).json({"projects": projects});
        } catch (error: any) {
            return response.status(401).json({ error: error.message });
        }
    }
}
