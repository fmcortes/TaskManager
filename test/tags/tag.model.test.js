const mongoose = require('mongoose');
const keys = require('../../config/config');
const Tag = require('../../src/tags/models/tag.model');

describe('Tag: Model', () => {
  beforeAll(() => {
    mongoose.Promise = global.Promise;
    mongoose.connect(keys.mongoURI, {
      useMongoClient: true
    });
  });

  beforeEach(async () => {
    await Tag.remove({});
  });

  test('Should fail saving a tag without name', async () => {
    const tag = new Tag({
      status: true,
      description: 'Bad tag'
    });

    try {
      await tag.save();
    } catch (err) {
      expect(err.name).toEqual('ValidationError');
      expect(err.message)
        .toEqual('tag validation failed: name: Path `name` is required.');
    } finally {
      expect(tag.__v).not.toBeDefined();
    }
  });

  test('Should fail saving a tag without status', async () => {
    const tag = new Tag({
      name: 'Test',
      description: 'Bad Tag'
    });

    try {
      await tag.save();
    } catch (err) {
      expect(err).toBeTruthy()
      expect(err.name).toEqual('ValidationError');
      expect(err.message)
        .toEqual('tag validation failed: status: Path `status` is required.');
    } finally {
      expect(tag.__v).toBeUndefined();
    }
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });
});
