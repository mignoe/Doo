//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

import { app } from '../main/server';
import chai  from 'chai';
import chaiHttp from 'chai-http';

const server = app;

chai.use(chaiHttp);


describe('Create tasks', () => {

    let projectId : string;
    let sessionId : string;

    beforeEach((done) => { //Before each test we empty the database
        chai.request(server)
            .post('/sign-up')
            .send({'name': "Test", 'password': "123"})
            .end((err : any, res : any) => {
                  res.should.have.status(201);
              done();
            });
        
        chai.request(server)
            .post('/sign-up')
            .send({'name': "Test2", 'password': "123"})
            .end((err : any, res : any) => {
                  res.should.have.status(201);
              done();
            });


        chai.request(server)
            .post('/projects/create')
            .send({'name': "TestProject", 'description': "Testing", 'userName': "Test", 'userPassword': "123"})
            .end((err : any, res : any) => {
                  res.should.have.status(201);
                  projectId = res.body.id;
              done();
            });
        
        chai.request(server)
            .post('/sessions/create')
            .send({'name': "Session Test", "projectId": projectId, "userName": "Test", "password": "123"})
            .end((err : any, res : any) => {
                  res.should.have.status(201);
                  sessionId = res.body.id;
              done();
            });

    });

    describe('/POST create task', () => {
        it('it should create the task', (done) => {
          chai.request(server) 
              .post('/tasks/create')
              .send({'name': "Task Test", "sessionId": sessionId, "userName": "Test", "password": "123"})
              .end((err : any, res : any) => {
                    res.should.have.status(201);
                done();
              });
        });

        it('it should not create the task', (done) => {
          chai.request(server)
              .post('/tasks/create')
              .send({'name': "", "sessionId": sessionId, "userName": "Test", "password": "123"})
              .end((err : any, res : any) => {
                    res.should.have.status(500);
                done();
              });
        });

        it('it should not create the task', (done) => {
          chai.request(server)
              .post('/tasks/create')
              .send({'name': "Task Test", "sessionId": "<a session id from a project in which this user does not make part>", "userName": "Test", "password": "123"})
              .end((err : any, res : any) => {
                    res.should.have.status(500);
                done();
              });
        });
    });
});