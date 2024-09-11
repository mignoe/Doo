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
process.env.NODE_ENV = 'test';
const server_1 = require("../main/server");
const supertest_1 = __importDefault(require("supertest"));
const server = server_1.app;
describe('Create tasks', () => {
    let projectId;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(server)
            .post('/sign-up')
            .send({ 'name': "Test", 'password': "123" })
            .expect(201);
        yield (0, supertest_1.default)(server)
            .post('/sign-up')
            .send({ 'name': "Test2", 'password': "123" })
            .expect(201);
        const res = yield (0, supertest_1.default)(server)
            .post('/projects/create')
            .send({ 'name': "TestProject", 'description': "Testing", 'userName': "Test", 'userPassword': "123" })
            .expect(201);
        projectId = res.body.id;
    }));
    describe('/POST create session', () => {
        it('should create the session', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server)
                .post('/sessions/create')
                .send({ 'name': "Session Test", "projectId": projectId, "userName": "Test", "password": "123" })
                .expect(201);
        }));
        it('should not create the session with an empty name', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server)
                .post('/sessions/create')
                .send({ 'name': "", "projectId": projectId, "userName": "Test", "password": "123" })
                .expect(500);
        }));
        it('should not create the session with an empty projectId', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server)
                .post('/sessions/create')
                .send({ 'name': "Session Test", "projectId": "", "userName": "Test", "password": "123" })
                .expect(500);
        }));
        it('should not create the session with another user’s projectId', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server)
                .post('/sessions/create')
                .send({ 'name': "Session Test", "projectId": "<another's project id>", "userName": "Test", "password": "123" })
                .expect(500);
        }));
    });
});
