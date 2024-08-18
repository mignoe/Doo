"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("./routes/userRoutes");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(userRoutes_1.userRoutes);
app.get('/', (request, response) => {
    return response.json({ message: 'Hello World' });
});
