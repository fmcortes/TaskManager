// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const User = require('../user/models/user.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
// Our parent block
describe('Users', () => {
   beforeEach((done) => {
      User.remove({}, (err) => {
         done();
      })
   });

   /*
   * Test the /GET route
   */
   describe('/GET user', () => {
      it('should GET all the users', (done) => {
         chai.request(server)
            .get('/api/users')
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('array');
               res.body.length.should.be.eql(0);
               done();
            });
      });
   });

   /*
   *Test the /POST route
   */
   describe('/POST user', () => {
      it('should not POST User without name', (done) => {
         let user = {
            position: "Front End Developer"
         }
         chai.request(server)
            .post('/api/users')
            .send(user)
            .end((err,  res) => {
               res.should.have.status(422);
               res.body.should.be.a('object');
               res.body.errors.should.have.property('name');
               res.body.errors.name.should.have.property('kind').eql('required');
               done();
            });
      });

      it('should POST a user', (done) => {
         let user = {
            name: "Francisco Manuel Cortes Hernandez",
            position: "Full Stack Developer"
         }
         chai.request(server)
            .post('/api/users')
            .send(user)
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('message').eql("User successfuly added!");
               res.body.user.should.have.property("name");
               res.body.user.should.have.property('position');
               done();
            });
      });

   });

});