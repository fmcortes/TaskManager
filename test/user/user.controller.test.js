const request = require('supertest');
const mongoose = require('mongoose');
const keys = require('../../config/config');
const app = require('../../config/express');
const User = require('../../src/user/models/user.model');

describe('Tags: Controller', () => {
  beforeAll(() => {
    mongoose.Promise = global.Promise;
    mongoose.connect(keys.mongoURI, {
      useMongoClient: true
    });
  });

  beforeEach(async () => {
    await User.remove({});
  });

  describe('GET Methods', () => {
    test('Should GET all the users', async () => {
      const response = await
        request(app)
          .get('/api/users')
          .expect(200)
          .expect('Content-Type', /json/);

      expect(response.body).toEqual(expect.arrayContaining([]));
      expect(response.body.length).toEqual(0);
    });
  });

  describe('POST Methods',  () => {
    test('Should not POST User without name', async () => {
      let user = {
        position: 'Front End Developr'
      };

      const response = await
        request(app)
          .post('/api/users')
          .send(user)
          .expect(422)
          .expect('Content-Type', /json/);

      expect(response.body.errors).toHaveProperty('name');
      expect(response.body.errors.name).toHaveProperty('kind', 'required');
    });

    test('Should post a user', async () => {
      let user = {
        name: 'Francisco Manuel Corts Hernandez',
        position: 'Full Stack Developer'
      };

      const response = await
        request(app)
          .post('/api/users')
          .send(user)
          .expect(200)
          .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('message', 'User successfuly added!');
      expect(response.body.user).toHaveProperty('name');
      expect(response.body.user).toHaveProperty('position');
    });
  });


  afterAll((done) => {
    mongoose.disconnect(done);
  });
});
