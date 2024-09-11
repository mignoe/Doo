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
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const server_1 = require("../main/server");
const supertest_1 = __importDefault(require("supertest"));
const server = server_1.app;
// Our parent block
describe('Create Projects', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(server)
            .post('/sign-up')
            .send({ 'name': "Test", 'password': "123" })
            .expect(201);
    }));
    describe('/POST create project', () => {
        it('should create the project', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server)
                .post('/create-project')
                .send({ 'name': "Project Test", 'description': "123", "userName": "Test", "password": "123" })
                .expect(201);
        }));
    });
    describe('/POST create project with empty string', () => {
        it('should not create the project with an empty name', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server)
                .post('/create-project')
                .send({ 'name': "", 'description': "123", "userName": "Test", "password": "123" })
                .expect(500);
        }));
        it('should not create the project with an empty description', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server)
                .post('/create-project')
                .send({ 'name': "TestProject", 'description': "", "userName": "Test", "password": "123" })
                .expect(500);
        }));
    });
});
describe('Try to add members to the Project', () => {
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
    describe('/PATCH add user to project', () => {
        it('should add the user to the project', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server)
                .patch('/projects/addUser')
                .send({ 'user': "Test2", 'projectId': projectId, 'adminName': "Test", 'adminPassword': "123" })
                .expect(200);
        }));
        it('should not add the user to the project with wrong admin credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server)
                .patch('/projects/addUser')
                .send({ 'user': "Test", 'projectId': projectId, 'adminName': "Test2", 'adminPassword': "123" })
                .expect(500);
        }));
    });
});
