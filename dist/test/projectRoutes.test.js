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
const chai_1 = require("chai");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const server = server_1.app;
const createProjectRoute = '/projects/create';
// Our parent block
describe('Create Projects', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(server)
            .post('/sign-up')
            .send({ 'name': "Test", 'password': "123" })
            .expect(201);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.user.deleteMany({});
        yield prisma.task.deleteMany({});
        yield prisma.session.deleteMany({});
        yield prisma.project.deleteMany({});
    }));
    it('Should create the project', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server)
            .post(createProjectRoute)
            .send({ 'name': "Project Test", "adminsNames": ["Test"], "usersNames": [], "userName": "Test", "userPassword": "123" });
        (0, chai_1.expect)(response.body.error).equal(undefined);
        (0, chai_1.expect)(response.status).equal(201);
        (0, chai_1.expect)(response.body.message).equal("Project created successfully.");
    }));
    it('should not create the project with an empty name', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(server)
            .post(createProjectRoute)
            .send({ 'name': "", 'description': "123", "userName": "Test", "password": "123" })
            .expect(500);
    }));
    it('should not create the project with an empty description', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(server)
            .post(createProjectRoute)
            .send({ 'name': "TestProject", 'description': "", "userName": "Test", "password": "123" })
            .expect(500);
    }));
});
describe('Try to add members to the Project', () => {
    let projectId;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.user.deleteMany({});
        yield prisma.task.deleteMany({});
        yield prisma.session.deleteMany({});
        yield prisma.project.deleteMany({});
        yield (0, supertest_1.default)(server)
            .post('/sign-up')
            .send({ 'name': "Test", 'password': "123" })
            .expect(201);
        yield (0, supertest_1.default)(server)
            .post('/sign-up')
            .send({ 'name': "Test2", 'password': "123" })
            .expect(201);
        const res = yield (0, supertest_1.default)(server)
            .post(createProjectRoute)
            .send({ 'name': "TestProject", 'usersNames': [], 'adminsNames': ["Test"], 'userName': "Test", 'userPassword': "123" })
            .expect(201);
        projectId = res.body.id;
    }));
    it('should add the user to the project', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server)
            .patch('/projects/addUser')
            .send({ 'newUserName': "Test2", 'projectId': projectId, 'adminName': "Test", 'adminPassword': "123" });
        (0, chai_1.expect)(response.body.error).equal(undefined);
        (0, chai_1.expect)(response.status).equal(200);
        (0, chai_1.expect)(response.body.message).equal("User added to the project successfully.");
    }));
    it('should not add the user to the project with wrong admin credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(server)
            .patch('/projects/addUser')
            .send({ 'user': "Test", 'projectId': projectId, 'adminName': "Test2", 'adminPassword': "123" })
            .expect(500);
    }));
});
