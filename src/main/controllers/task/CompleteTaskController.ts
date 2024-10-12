// CompleteTaskController.ts
import { Request, Response } from 'express';
import { CompleteTaskService } from '../../services/task/CompleteTaskService';

export class CompleteTaskController {
    async handle(request: Request, response: Response) {
        const { taskId } = request.body;
        const completeTaskService = new CompleteTaskService();

        try {
            const updatedTask = await completeTaskService.execute(taskId);
            return response.status(200).json(updatedTask);
        } catch (error : any) {
            console.log("Error completing task for task: ", taskId, "\n error: \n", error)

            return response.status(500).json({ error: 'Failed to complete task', fullError: error.message });
        }
    }
}
