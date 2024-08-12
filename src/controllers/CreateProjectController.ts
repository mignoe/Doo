import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export class CreateBookController {
    async handle(request: Request, response: Response){

        const { userName, userPassword, projectName } = request.body

        const prismaClient = new PrismaClient()
        
        // autentifica o usuário
        const user = await prismaClient.user.findFirst({
            where: {
                name: userName,
                password: userPassword
            }
        })

        const project =  await prismaClient.project.create({
            data: {
                projectName,
                
            }
        })

        return response.json(book)
    }    
}