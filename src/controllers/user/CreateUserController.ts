import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

import { CustomError } from '../../errors/CustomError';

export class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, password } = request.body;
        const createUserService = new CreateUserService();

        try {
            const user = await createUserService.execute(name, password);
            return response.status(201).json(user);
        } catch (error : any) {

            if (error instanceof CustomError) {
                const statusCode = error.statusCode;
                const message = error.message;

                return response.status(statusCode).json({ error: message });
            }

            return response.status(500).json({ error: "Uknown error creating User" });
        }
    }
}
