import express, { Request, Response } from 'express';
import { userRoutes } from './routes/userRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(userRoutes);

app.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello World' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
