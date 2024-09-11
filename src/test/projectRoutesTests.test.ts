// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

import { app } from '../main/server';
import request from 'supertest';
import { expect } from 'chai';

const server = app;

// Our parent block
describe('Create Projects', () => {
    beforeEach(async () => {
        await request(server)
            .post('/sign-up')
            .send({ 'name': "Test", 'password': "123" })
            .expect(201);
    });

    describe('/POST create project', () => {
        it('should create the project', async () => {
            await request(server)
                .post('/create-project')
                .send({ 'name': "Project Test", 'description': "123", "userName": "Test", "password": "123" })
                .expect(201);
        });
    });
    
    describe('/POST create project with empty string', () => {
        it('should not create the project with an empty name', async () => {
            await request(server)
                .post('/create-project')
                .send({ 'name': "", 'description': "123", "userName": "Test", "password": "123" })
                .expect(500);
        });
        
        it('should not create the project with an empty description', async () => {
            await request(server)
                .post('/create-project')
                .send({ 'name': "TestProject", 'description': "", "userName": "Test", "password": "123" })
                .expect(500);
        });
    });
});

describe('Try to add members to the Project', () => {
    let projectId: string;

    beforeEach(async () => {
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

    describe('/PATCH add user to project', () => {
        it('should add the user to the project', async () => {
            await request(server)
                .patch('/projects/addUser')
                .send({ 'user': "Test2", 'projectId': projectId, 'adminName': "Test", 'adminPassword': "123" })
                .expect(200);
        });

        it('should not add the user to the project with wrong admin credentials', async () => {
            await request(server)
                .patch('/projects/addUser')
                .send({ 'user': "Test", 'projectId': projectId, 'adminName': "Test2", 'adminPassword': "123" })
                .expect(500);
        });
    });
});
