import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

export class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, password } = request.body;
        const createUserService = new CreateUserService();

        try {
            const user = await createUserService.execute(name, password);
            return response.status(201).json(user);
        } catch (error : any) {
            return response.status(409).json({ error: error.message });
        }
    }
}
