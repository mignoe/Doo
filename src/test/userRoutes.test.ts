process.env.NODE_ENV = 'test';

import { app } from '../main/server';
import request from 'supertest';
import { expect } from 'chai';


import { PrismaClient } from '@prisma/client';import exp from 'constants';
const prisma = new PrismaClient();

const server = app;

// Tests for the 'Users' endpoints
describe('Users', () => {

    beforeEach(async () => {
      await prisma.user.deleteMany({});
      await prisma.project.deleteMany({});
      await prisma.session.deleteMany({});
    });

    // Sign-up user tests
    describe('/POST sign-up', () => {
        it('should create the user', async () => {
            await request(server)
                .post('/sign-up')
                .send({ name: "Test", password: "123" })
                .expect(201);
        });

        it('should return an error when the name is an empty string', async () => {
            await request(server)
                .post('/sign-up')
                .send({ 'name': "", 'password': "123" })
                .expect(500);
        });

        it('should not create the user when the password is empty', async () => {
            await request(server)
                .post('/sign-up')
                .send({ 'name': "miguel", 'password': "" })
                .expect(500);
        });
    });

    // Login user tests
    describe('/POST login', () => {
        it('should login the user', async () => {

          // Create a user before testing the login
          await request(server) 
            .post('/sign-up')
            .send({ name: "Test", password: "123" })
          .expect(201);

          const response = await request(server)
              .post('/login')
              .send({ name: "Test", password: "123" });      
            
          
          // console.log(response.body);
          
          expect(response.body.error).equal(undefined);
          expect(response.body.message).equal("User logged in successfully");
          expect(response.body.user).equal("Test");
          expect(response.status).equal(200);
      });
    });
});
