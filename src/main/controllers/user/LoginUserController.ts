import { Request, Response } from 'express'
import { AuthenticateUserService } from '../../services/user/AuthenticateUserService'
import { CustomError } from '../../errors/CustomError'

export class LoginUserController {
    async handle(request: Request, response: Response){
        const { name, password } = request.body;

        const authenticateUserService = new AuthenticateUserService()

        try {
            
            const user = await authenticateUserService.execute(name, password)
    
                return response.status(200).json({message: "User logged in successfully", user: user.name})

        } catch (error : any) {
            if (error instanceof CustomError) {
                const statusCode = error.statusCode;
                const message = error.message;

                return response.status(statusCode).json({ error: message });
            }

        return response.status(500).json({ message: /*"Uknown error creating User"*/ error.message });
        }
    }
}