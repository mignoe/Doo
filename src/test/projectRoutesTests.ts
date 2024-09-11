//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

import { app } from '../main/server';
import chai  from 'chai';
import chaiHttp from 'chai-http';

const server = app;

chai.use(chaiHttp);

//Our parent block
describe('Create Projects', () => {
    beforeEach((done) => { //Before each test we empty the database
        chai.request(server)
            .post('/sign-up')
            .send({'name': "Test", 'password': "123"})
            .end((err : any, res : any) => {
                  res.should.have.status(201);
              done();
            });
    });

    describe('/POST create project', () => {
        it('it should create the project', (done) => {
          chai.request(server)
              .post('/create-project')
              .send({'name': "Project Test", 'description': "123", "userName": "Test", "password": "123"})
              .end((err : any, res : any) => {
                    res.should.have.status(201);
                done();
              });
        });
    })
    
    describe('/POST create project with empty string', () => {
        it('it should not create the project', (done) => {
          chai.request(server)
              .post('/create-project')
              .send({'name': "", 'description': "123", "userName": "Test", "password": "123"})
              .end((err : any, res : any) => {
                    res.should.have.status(500);
                done();
              });
        });
        
        it('it should not create the project', (done) => {
          chai.request(server)
              .post('/create-project')
              .send({'name': "TestProject", 'description': "", "userName": "Test", "password": "123"})
              .end((err : any, res : any) => {
                    res.should.have.status(500);
                done();
              });
        });
    })

});

describe('Try to add members to the Project', () => {

    let projectId : string;

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
    });

    describe('/PATCH add user to project', () => {
        it('it should add the user to the project', (done) => {
          chai.request(server)
              .patch('/projects/addUser')
              .send({'user': "Test2", 'projectId': projectId, 'adminName': "Test", 'adminPassword': "123"})
              .end((err : any, res : any) => {
                    res.should.have.status(200);
                done();
              });
        });

        it('it should not add the user to the project', (done) => {
          chai.request(server)
              .patch('/projects/addUser')
              .send({'user': "Test", 'projectId': projectId, 'adminName': "Test2", 'adminPassword': "123"})
                .end((err : any, res : any) => {
                        res.should.have.status(500);
                    done();
                });
        });
    });
});