// During the test the env variable is set to test
if (process.env.NODE_ENV !== 'test') {
   process.env.NODE_ENV = 'test';
}

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');

// Models
const Tag = require('../../src/tags/models/tag.model');

let should = chai.should();
chai.use(chaiHttp);

describe('Tags', () => {
   beforeEach(done => {
      Tag.remove({}, err => {
         done();
      });
   });

   /**
    * Test the /Get route
    */
   describe('/GET tags', () => {
      it('should GET all the tags', done => {
         chai
            .request(server)
            .get('/api/tags')
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('array');
               res.body.length.should.be.eql(0);
               done();
            });
      });
   });

   /**
     * Test the /POST route
     */
   describe('/POST tag', () => {
      it('should not POST Tag without properties', done => {
         let tag = {};
         chai
            .request(server)
            .post('/api/tags')
            .send(tag)
            .end((err, res) => {
               res.should.have.status(422);
               res.body.should.be.a('object');
               res.body.should.have.property('errors');
               res.body.errors.should.have.property('name');
               res.body.errors.name.should.have
                  .property('kind')
                  .eql('required');
               done();
            });
      });

      it('should not POST Tag without name', done => {
         let tag = {
            name: '',
            status: true,
            description: 'description test'
         };
         chai
            .request(server)
            .post('/api/tags')
            .send(tag)
            .end((err, res) => {
               res.should.have.status(422);
               res.body.should.be.a('object');
               res.body.should.have.property('errors');
               res.body.errors.should.have.property('name');
               res.body.errors.name.should.have
                  .property('kind')
                  .eql('required');
               done();
            });
      });

      it('should not POST Tag without status', done => {
         let tag = { name: 'test tag', description: 'description test' };
         chai
            .request(server)
            .post('/api/tags')
            .send(tag)
            .end((err, res) => {
               res.should.have.status(422);
               res.body.should.be.a('object');
               res.body.should.have.property('errors');
               res.body.errors.should.have.property('status');
               res.body.errors.status.should.have
                  .property('kind')
                  .eql('required');
               done();
            });
      });

      it('should POST Tag', done => {
         let tag = {
            name: 'test tag',
            status: true,
            description: 'description test'
         };
         chai
            .request(server)
            .post('/api/tags')
            .send(tag)
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have
                  .property('message')
                  .eql('Tag successfully created!');
               res.body.should.have.property('tag');
               res.body.tag.should.have.property('name');
               res.body.tag.should.have.property('status');
               res.body.tag.should.have.property('description');
               done();
            });
      });
   });

   /**
    * Test the /GET/:id tag
    */
   describe('/GET/:id tag', () => {
      it('it should Get a tag by the given id', done => {
         let tag = new Tag({
            name: 'test tag1',
            status: true,
            description: 'some tag'
         });
         tag.save((err, tag) => {
            chai
               .request(server)
               .get('/api/tags/' + tag.id)
               .send(tag)
               .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.a('object');
                  res.body.should.have.property('name');
                  res.body.should.have.property('status');
                  res.body.should.have.property('description');
                  res.body.should.have.property('_id').eql(tag.id);
                  done();
               });
         });
      });
   });

   /**
    * Test the /PUT/:id route
    */
   describe('/PUT/:id tag', () => {
      it('should UPDATE a tag given the id', done => {
         let tag = new Tag({
            name: 'tag put',
            status: false,
            description: 'a tag tu be update'
         });
         tag.save((err, tag) => {
            chai
               .request(server)
               .put('/api/tags/' + tag.id)
               .send({
                  name: 'tag put updated',
                  status: true,
                  description: 'a tag updated'
               })
               .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Tag updated!');
                  res.body.should.have.property('message').eql('Tag updated!');
                  res.body.should.have.property('tag');
                  res.body.tag.should.have
                     .property('description')
                     .eql('a tag updated');
                  done();
               });
         });
      });
   });
   /**
    *
    Test /DELETE/:id tag
    */
   describe('/DELETE/:id tag', () => {
      it('should DELETE a tag given the id', done => {
         let tag = new Tag({
            name: 'tag put',
            status: false,
            description: 'a tag tu be deleted'
         });
         tag.save((err, tag) => {
            chai
               .request(server)
               .delete('/api/tags/' + tag.id)
               .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have
                     .property('message')
                     .eql('Tag successfully deleted!');
                  res.body.should.have.property('result');
                  res.body.result.should.have.property('ok').eql(1);
                  res.body.result.should.have.property('n').eql(1);
                  done();
               });
         });
      });
   });
});
