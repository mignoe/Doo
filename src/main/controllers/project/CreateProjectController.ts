// CreateProjectController.ts
import { Request, Response } from 'express';
import { CreateProjectService } from '../../services/project/CreateProjectService';
import { CustomError } from '../../errors/CustomError';
import { AuthenticateUserService } from '../../services/user/AuthenticateUserService';


export class CreateProjectController {
    async handle(request: Request, response: Response) {
        const { name, usersNames, adminsNames, userName, userPassword } = request.body;
        const createProjectService = new CreateProjectService();
        const authenticatedUser = new AuthenticateUserService();

        try {
            await authenticatedUser.execute(userName, userPassword);
            // console.log(name, usersNames, adminsNames, userName, userPassword);

            const project = await createProjectService.execute(name, usersNames, adminsNames);


            return response.status(201).json({message: "Project created successfully.", id: project.id});
        } catch (error : any) {
            
            if (error instanceof CustomError) {
                const statusCode = error.statusCode;
                const message = error.message;

                return response.status(statusCode).json({ error: message });
            }

            return response.status(500).json({ error: 'Unknown error creating project', message: error.message });
        }
    }
}