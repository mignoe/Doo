"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("./routes/userRoutes");
const proejctRoutes_1 = require("./routes/proejctRoutes");
const taskRoutes_1 = require("./routes/taskRoutes");
const sessionRoutes_1 = require("./routes/sessionRoutes");
exports.app = (0, express_1.default)();
const port = 3000;
exports.app.use(express_1.default.json());
exports.app.use(userRoutes_1.userRoutes);
exports.app.use(proejctRoutes_1.projectRoutes);
exports.app.use(sessionRoutes_1.sessionRoutes);
exports.app.use(taskRoutes_1.taskRoutes);
exports.app.get('/', (request, response) => {
    return response.json({ message: 'This is the Doo service! :)' });
});
exports.app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
