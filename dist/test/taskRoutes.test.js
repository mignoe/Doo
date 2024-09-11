"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../main/server"); // Adjust the import according to your project
describe('Create tasks', () => {
    let projectId;
    let sessionId;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Sign up users
        yield (0, supertest_1.default)(server_1.app)
            .post('/sign-up')
            .send({ name: "Test", password: "123" })
            .expect(201);
        yield (0, supertest_1.default)(server_1.app)
            .post('/sign-up')
            .send({ name: "Test2", password: "123" })
            .expect(201);
        // Create project
        const projectRes = yield (0, supertest_1.default)(server_1.app)
            .post('/projects/create')
            .send({ name: "TestProject", description: "Testing", userName: "Test", userPassword: "123" })
            .expect(201);
        projectId = projectRes.body.id;
        // Create session
        const sessionRes = yield (0, supertest_1.default)(server_1.app)
            .post('/sessions/create')
            .send({ name: "Session Test", projectId, userName: "Test", password: "123" })
            .expect(201);
        sessionId = sessionRes.body.id;
    }));
    describe('/POST create task', () => {
        it('should create the task', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server_1.app)
                .post('/tasks/create')
                .send({ name: "Task Test", sessionId, userName: "Test", password: "123" })
                .expect(201);
        }));
        it('should not create the task with missing name', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server_1.app)
                .post('/tasks/create')
                .send({ name: "", sessionId, userName: "Test", password: "123" })
                .expect(500);
        }));
        it('should not create the task with invalid sessionId', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server_1.app)
                .post('/tasks/create')
                .send({ name: "Task Test", sessionId: "<invalid>", userName: "Test", password: "123" })
                .expect(500);
        }));
    });
});
