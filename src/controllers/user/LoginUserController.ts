import { Request, Response } from 'express'
import { AuthenticateUserService } from '../../services/user/AuthenticateUserService'

export class LoginUserController {
    async handle(request: Request, response: Response){
        const { name, password } = request.body;
        const authenticateUserService = new AuthenticateUserService()

        try {
            
            const existingUser = await authenticateUserService.execute(name, password);

            if (existingUser) {
                return response.status(200).json(existingUser)
            }

            return response.status(404).json({ error: 'User not found' })
        } catch (error : any) {
            return response.status(500).json({ error: error.message })
        }
    }
}