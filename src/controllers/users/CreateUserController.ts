import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export class CreateUserController {
    async handle(request: Request, response: Response){

        const { userName, userPassword } = request.body

        const prismaClient = new PrismaClient()
        
        // autentifica o usuário
        const existingUser = await prismaClient.user.findFirst({
            where: {
            name: userName
            }
        })

        if (existingUser) {
            // User already exists
            return response.status(409).json({ error: 'User already exists' })
        }

        const user =  await prismaClient.user.create({
            data: {
                name: userName,
                password: userPassword               
            }
        })

        return response.status(201)
    }    
}