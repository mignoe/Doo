import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export class CreateUserController {
    async handle(request: Request, response: Response){

        const { name, password } = request.body

        const prismaClient = new PrismaClient()
        
        // autentifica o usuário
        const existingUser = await prismaClient.user.findFirst({
            where: {
            name: name
            }
        })

        if (existingUser) {
            // User already exists
            return response.status(409).json({ error: 'User already exists' })
        }


        const user =  await prismaClient.user.create({
            data: {
                name,
                password
            }
        })

        return response.json(user)
    }    
}