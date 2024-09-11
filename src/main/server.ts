import express, { Request, Response } from 'express';
import { userRoutes } from './routes/userRoutes';
import { projectRoutes } from './routes/proejctRoutes';
import { taskRoutes } from './routes/taskRoutes';
import { sessionRoutes } from './routes/sessionRoutes';

export const app = express();
const port = 3000;

app.use(express.json());
app.use(userRoutes);
app.use(projectRoutes);
app.use(sessionRoutes);
app.use(taskRoutes);

app.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'This is the Doo service! :)' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
