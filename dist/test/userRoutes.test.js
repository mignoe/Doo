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
const chai_1 = require("chai");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const server = server_1.app;
// Tests for the 'Users' endpoints
describe('Users', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.user.deleteMany({});
        yield prisma.project.deleteMany({});
        yield prisma.session.deleteMany({});
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.user.deleteMany({});
        yield prisma.project.deleteMany({});
        yield prisma.session.deleteMany({});
    }));
    // Sign-up user tests
    describe('/POST sign-up', () => {
        it('should create the user', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server)
                .post('/sign-up')
                .send({ name: "Test", password: "123" })
                .expect(201);
        }));
        it('should return an error when the name is an empty string', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server)
                .post('/sign-up')
                .send({ 'name': "", 'password': "123" })
                .expect(500);
        }));
        it('should not create the user when the password is empty', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server)
                .post('/sign-up')
                .send({ 'name': "miguel", 'password': "" })
                .expect(500);
        }));
    });
    // Login user tests
    describe('/POST login', () => {
        it('should login the user', () => __awaiter(void 0, void 0, void 0, function* () {
            // Create a user before testing the login
            yield (0, supertest_1.default)(server)
                .post('/sign-up')
                .send({ name: "Test", password: "123" })
                .expect(201);
            const response = yield (0, supertest_1.default)(server)
                .post('/login')
                .send({ name: "Test", password: "123" });
            // console.log(response.body);
            (0, chai_1.expect)(response.body.error).equal(undefined);
            (0, chai_1.expect)(response.body.message).equal("User logged in successfully");
            (0, chai_1.expect)(response.body.user).equal("Test");
            (0, chai_1.expect)(response.status).equal(200);
        }));
    });
});
