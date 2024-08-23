import { Router } from "express";
import { CreateSessionController } from "../controllers/session/CreateSessionController";
import { DeleteSessionController } from "../controllers/session/DeleteSessionController";
import { GetSessionsByProjectController } from "../controllers/session/GetSessionsByProjectController";

const sessionRoutes = Router();

const createSessionController = new CreateSessionController();
const deleteSessionController = new DeleteSessionController();
const getSessionsByProjectController = new GetSessionsByProjectController();

sessionRoutes.post('/sessions/create', createSessionController.handle);
sessionRoutes.delete('/sessions/delete', deleteSessionController.handle);
sessionRoutes.get('/sessions/getSessionsByProject', getSessionsByProjectController.handle);

export { sessionRoutes };