process.env.NODE_ENV = 'test';

import { app } from '../main/server';
import request from 'supertest';
import { expect } from 'chai';

import { PrismaClient } from '@prisma/client';
import exp from 'constants';
const prisma = new PrismaClient();


const server = app;
//tests
describe('Create sessions', () => {

    let projectId: string;

    beforeEach(async () => {

        await prisma.user.deleteMany({});
        await prisma.task.deleteMany({});
        await prisma.session.deleteMany({});
        await prisma.project.deleteMany({});

        await request(server)
            .post('/sign-up')
            .send({ 'name': "Test", 'password': "123" })
            .expect(201);

        await request(server)
            .post('/sign-up')
            .send({ 'name': "Test2", 'password': "123" })
            .expect(201);

            const res = await request(server)
            .post('/projects/create')
            .send({ 'name': "TestProject", 'usersNames': [], 'adminsNames': ["Test"],'userName': "Test", 'userPassword': "123" })
            .expect(201);

            
            projectId = res.body.id;
    });

    afterEach(async () => {
        await prisma.user.deleteMany({});
        await prisma.task.deleteMany({});
        await prisma.session.deleteMany({});
        await prisma.project.deleteMany({});
    } );

    it('should create the session', async () => {
        const response = await request(server)
            .post('/sessions/create')
            .send({ 'sessionName': "Session Test", "projectId": projectId, "adminName": "Test", "adminPassword": "123" });

        console.log(response.body);

        expect(response.body.error).equal(undefined);
        expect(response.status).equal(201);
        expect(response.body.message).equal("Session created successfully.");

    });

    it('should not create the session with an empty name', async () => {
        await request(server)
            .post('/sessions/create')
            .send({ 'name': "", "projectId": projectId, "userName": "Test", "password": "123" })
            .expect(500);
    });

    it('should not create the session with an empty projectId', async () => {
        await request(server)
            .post('/sessions/create')
            .send({ 'name': "Session Test", "projectId": "", "userName": "Test", "password": "123" })
            .expect(500);
    });

    it('should not create the session with another user’s projectId', async () => {
        await request(server)
            .post('/sessions/create')
            .send({ 'name': "Session Test", "projectId": "<another's project id>", "userName": "Test", "password": "123" })
            .expect(500);
    });
    
});
