process.env.NODE_ENV = 'test';

import { app } from '../main/server';
import request from 'supertest';
import { expect } from 'chai';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const server = app;
//tests
describe('Create sessions', () => {

    let projectId: string;

    beforeEach(async () => {

        await prisma.user.deleteMany({});
        await prisma.project.deleteMany({});
        await prisma.session.deleteMany({});

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
            .send({ 'name': "TestProject", 'description': "Testing", 'userName': "Test", 'userPassword': "123" })
            .expect(201);

        projectId = res.body.id;
    });

    afterEach(async () => {
        await prisma.user.deleteMany({});
        await prisma.project.deleteMany({});
        await prisma.session.deleteMany({});
    } );

    describe('/POST create session', () => {
        it('should create the session', async () => {
            await request(server)
                .post('/sessions/create')
                .send({ 'name': "Session Test", "projectId": projectId, "userName": "Test", "password": "123" })
                .expect(201);
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
});
