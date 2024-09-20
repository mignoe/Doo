import request from 'supertest';
import { app as server } from '../main/server'; // Adjust the import according to your project

import { PrismaClient } from '@prisma/client';import exp from 'constants';
import { expect } from 'chai';
const prisma = new PrismaClient();


describe('Create tasks', () => {
    let projectId: string;
    let sessionId: string;

    beforeEach(async () => {
        // Sign up users
        await request(server)
            .post('/sign-up')
            .send({ name: "Test", password: "123" })
            .expect(201);

        await request(server)
            .post('/sign-up')
            .send({ name: "Test2", password: "123" })
            .expect(201);

        // Create project
        const res = await request(server)
            .post('/projects/create')
            .send({ 'name': "TestProject", 'usersNames': [], 'adminsNames': ["Test"],'userName': "Test", 'userPassword': "123" })
            .expect(201);

        projectId = res.body.id;

        // Create session
        const sessionRes = await request(server)
        .post('/sessions/create')
        .send({ 'sessionName': "Session Test", "projectId": projectId, "adminName": "Test", "adminPassword": "123" })
        .expect(201);

        sessionId = sessionRes.body.id;
    });

    afterEach(async () => {
        await prisma.user.deleteMany({});
        await prisma.task.deleteMany({});
        await prisma.session.deleteMany({});
        await prisma.project.deleteMany({});
    } );

    it('should create the task', async () => {
        const response = await request(server)
            .post('/tasks/create')
            .send({ taskName: "Task Test", taskContent: "test content", "sessionId": sessionId, userName: "Test", userPassword: "123" });

        expect(response.body.error).equal(undefined);
        expect(response.status).equal(201);
        expect(response.body.message).equal("Task created successfully.");

    });

    it('should not create the task with missing name', async () => {
        await request(server)
            .post('/tasks/create')
            .send({ name: "", sessionId, userName: "Test", password: "123" })
            .expect(500);
    });

    it('should not create the task with invalid sessionId', async () => {
        await request(server)
            .post('/tasks/create')
            .send({ name: "Task Test", sessionId: "<invalid>", userName: "Test", password: "123" })
            .expect(500);
    });
    
});
