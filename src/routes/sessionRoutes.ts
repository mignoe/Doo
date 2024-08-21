import { Router } from "express";
import { CreateSessionController } from "../controllers/session/CreateSessionController";

const sessionRoutes = Router();

const createSessionController = new CreateSessionController();

sessionRoutes.post('/session/create', createSessionController.handle);

export { sessionRoutes };