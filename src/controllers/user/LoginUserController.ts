import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export class LoginUserController {
    async handle(request: Request, response: Response){

        const { name, password } = request.body

        const prismaClient = new PrismaClient()

        // autentifica o usuário
        const existingUser = await prismaClient.user.findFirst({
            where: {
            name: name,
            password: password
            }
        })

        if (existingUser) {
            // User already exists
            return response.status(200).json(existingUser)
        }

        return response.status(404).json({ error: 'User not found' })
    }
}