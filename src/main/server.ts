import express, { Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes';
import { projectRoutes } from './routes/proejctRoutes';
import { taskRoutes } from './routes/taskRoutes';
import { sessionRoutes } from './routes/sessionRoutes';

export const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());
app.use(userRoutes);
app.use(projectRoutes);
app.use(sessionRoutes);
app.use(taskRoutes);


if (process.env.container) {
  console.log("Running inside Docker");
} else {
  console.log("Running outside Docker");
}

app.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'This is the Doo service! :)' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
