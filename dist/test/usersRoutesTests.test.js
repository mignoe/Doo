"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const server_1 = require("../main/server");
// let mongoose = require("mongoose");
//Require the dev-dependencies
let chai_ = require('chai');
let chaiHttp = require('chai-http');
const server = server_1.app;
let should = chai_.should();
chai_.use(chaiHttp);
//Our parent block
describe('Users', () => {
    beforeEach((done) => {
    });
    /*
      * Test the /GET route
      */
    describe('/POST sign-up', () => {
        it('it should create the user', (done) => {
            chai_.request(server)
                .post('/sign-up')
                .send({ 'name': "Test", 'password': "123" })
                .end((err, res) => {
                res.should.have.status(201);
                done();
            });
        });
    });
    describe('/POST trying to sign-up with empty string', () => {
        it('it should return an error', (done) => {
            chai_.request(server)
                .post('/sign-up')
                .send({ 'name': "", 'password': "123" })
                .end((err, res) => {
                res.should.have.status(500);
                done();
            });
        });
        it('it should not create the user', (done) => {
            chai_.request(server)
                .post('/sign-up')
                .send({ 'name': "miguel", 'password': "" })
                .end((err, res) => {
                res.should.have.status(500);
                done();
            });
        });
    });
    describe('/POST login', () => {
        it('it should create the user', (done) => {
            chai_.request(server)
                .post('/sign-up')
                .send({ 'name': "Test", 'password': "123" })
                .end((err, res) => {
                res.should.have.status(201);
                done();
            });
        });
        it('it should login the user', (done) => {
            chai_.request(server)
                .post('/login')
                .send({ 'name': "Test", 'password': "123" })
                .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });
});
