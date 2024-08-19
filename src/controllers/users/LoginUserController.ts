import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export class LoginUserController {
    async handle(request: Request, response: Response){

        const { userName, userPassword } = request.body

        const prismaClient = new PrismaClient()
        
        // autentifica o usuário
        const existingUser = await prismaClient.user.findFirst({
            where: {
            name: userName,
            password: userPassword
            }
        })

        if (existingUser) {
            // User already exists
            return response.status(200)
        }

        // User already exists
        return response.status(409).json({ error: 'User already exists' })

    }    
}