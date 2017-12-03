const request = require('supertest');
const mongoose = require('mongoose');
const keys = require('../../config/config');
const app = require('../../config/express');
const Tag = require('../../src/tags/models/tag.model');

describe('Tags: Controller', () => {
  beforeAll(() => {
    mongoose.Promise = global.Promise;
    mongoose.connect(keys.mongoURI, {
      useMongoClient: true
    });
  });

  beforeEach(async () => {
    await Tag.remove({});
  });

  describe('GET Methods', () => {
    test('Should GET all the tags', async () => {
      const response = await
        request(app)
          .get('/api/tags')
          .expect(200)
          .expect('Content-Type', /json/);

      expect(response.body).toEqual(expect.arrayContaining([]));
      expect(response.body.length).toEqual(0);
    });

    test('Should GET a tag by the given id', async () => {
      let tag = new Tag({
        name: 'test tag1',
        status: true,
        description: 'some tag'
      });

      await tag.save();

      const response = await
        request(app)
          .get(`/api/tags/${tag.id}`)
          .expect(200)
          .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('_id', tag.id);
    });

    test('Should return 422 trying to get a non-existing tag', async () => {
      const response = await
        request(app)
          .get(`/api/tags/123`)
          .expect(422);
    });
  });

  describe('POST Methods', () => {
    test('Should not POST Tag without properties', async () => {
      const response = await
        request(app)
          .post('/api/tags')
          .send({})
          .expect(422)
          .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toHaveProperty('name');
      expect(response.body.errors.name).toHaveProperty('kind', 'required');
    });

    test('Should not POST Tag without name', async () => {
      let tag = {
        name: '',
        status: true,
        description: 'description test'
      };

      const response = await
        request(app)
          .post('/api/tags')
          .send(tag)
          .expect(422)
          .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toHaveProperty('name');
      expect(response.body.errors.name).toHaveProperty('kind', 'required');
    });

    test('Should not POST Tag without status', async () => {
      let tag = {
        name: 'test tag',
        description: 'description test'
      };

      const response = await
        request(app)
          .post('/api/tags')
          .send(tag)
          .expect(422)
          .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toHaveProperty('status');
      expect(response.body.errors.status).toHaveProperty('kind', 'required');
    });

    test('Should POST Tag', async () => {
      let tag = {
        name: 'test tag',
        status: true,
        description: 'description test'
      };

      const response = await
        request(app)
          .post('/api/tags')
          .send(tag)
          .expect(200)
          .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('message', 'Tag successfully created!');
      expect(response.body).toHaveProperty('tag');
      expect(response.body.tag).toHaveProperty('name');
      expect(response.body.tag).toHaveProperty('status');
      expect(response.body.tag).toHaveProperty('description');
    });
  });

  describe('PUT Methods', () => {
    test('Should UPDATE a Tag given the ID', async () => {
      let tag = new Tag({
        name: 'tag put',
        status: false,
        description: 'a tag to be update'
      });

      await tag.save();

      const response = await
        request(app)
          .put(`/api/tags/${tag.id}`)
          .send({
            name: 'tag put updated',
            status: true,
            description: 'a tag updated'
          })
          .expect(200)
          .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('message', 'Tag updated!');
      expect(response.body).toHaveProperty('tag');
      expect(response.body.tag).toHaveProperty('description', 'a tag updated');
    });
  });

  describe('DELETE Methods', () => {
    it('Should DELETE a Tag given the id', async () => {
      let tag = new Tag({
        name: 'tag delete',
        status: false,
        description: 'a tag to be delete'
      });

      await tag.save();

      const response = await
        request(app)
          .delete(`/api/tags/${tag.id}`)
          .expect(200)
          .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('message', 'Tag successfully deleted!');
      expect(response.body).toHaveProperty('result');
      expect(response.body.result).toHaveProperty('ok', 1);
      expect(response.body.result).toHaveProperty('n', 1)
    });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });
});
