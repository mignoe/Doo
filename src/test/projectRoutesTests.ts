//During the test the env variable is set to test
process.env.NODE_ENV = 'test';



chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        chai_.request(server)
            .post('/sign-up')
            .send({'name': "Test", 'password': "123"})
            .end((err : any, res : any) => {
                  res.should.have.status(201);
              done();
            });
    });

    describe('/POST create project', () => {
        it('it should create the project', (done) => {
          chai_.request(server)
              .post('/create-project')
              .send({'name': "Test", 'description': "123"})
              .end((err : any, res : any) => {
                    res.should.have.status(201);
                done();
              });
        });
    }

});