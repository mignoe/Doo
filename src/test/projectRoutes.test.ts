// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

import { app } from '../main/server';
import request from 'supertest';
import { expect } from 'chai';


import { PrismaClient } from '@prisma/client';import exp from 'constants';
const prisma = new PrismaClient();

const server = app;

const createProjectRoute = '/projects/create';

// Our parent block
describe('Create Projects', () => {
    beforeEach(async () => {

        await request(server)
            .post('/sign-up')
            .send({ 'name': "Test", 'password': "123" })
            .expect(201);
    });

    afterEach(async () => {
        await prisma.user.deleteMany({});
        await prisma.task.deleteMany({});
        await prisma.session.deleteMany({});
        await prisma.project.deleteMany({});
    } );

    it('Should create the project', async () => {
        const response = await request(server)
            .post(createProjectRoute)
            .send({ 'name': "Project Test",  "adminsNames": ["Test"], "usersNames": [], "userName": "Test", "userPassword": "123" });

            expect(response.body.error).equal(undefined);
            expect(response.status).equal(201);
            expect(response.body.message).equal("Project created successfully.");
    });
   
    it('should not create the project with an empty name', async () => {
        await request(server)
            .post(createProjectRoute)
            .send({ 'name': "", 'description': "123", "userName": "Test", "password": "123" })
            .expect(500);
    });
    
    it('should not create the project with an empty description', async () => {
        await request(server)
            .post(createProjectRoute)
            .send({ 'name': "TestProject", 'description': "", "userName": "Test", "password": "123" })
            .expect(500);
    });
    
});

describe('Try to add members to the Project', () => {
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
            .post(createProjectRoute)
            .send({ 'name': "TestProject", 'usersNames': [], 'adminsNames': ["Test"],'userName': "Test", 'userPassword': "123" })
            .expect(201);

            
            projectId = res.body.id;
        });
        
        
        it('should add the user to the project', async () => {
            const response = await request(server)
            .patch('/projects/addUser')
            .send({ 'newUserName': "Test2", 'projectId': projectId, 'adminName': "Test", 'adminPassword': "123" });

            
            expect(response.body.error).equal(undefined);
            expect(response.status).equal(200);
            expect(response.body.message).equal("User added to the project successfully.");

    });

    it('should not add the user to the project with wrong admin credentials', async () => {
        await request(server)
            .patch('/projects/addUser')
            .send({ 'user': "Test", 'projectId': projectId, 'adminName': "Test2", 'adminPassword': "123" })
            .expect(500);
    });

});
