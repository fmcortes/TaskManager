const mongoose = require('mongoose');
const keys = require('../../config/config');
const User = require('../../src/user/models/user.model');

describe('User: Model', () => {
  beforeAll(() => {
    mongoose.Promise = global.Promise;
    mongoose.connect(keys.mongoURI, {
      useMongoClient: true
    });
  });

  beforeEach(async () => {
    await User.remove({});
  });

  test('Should fail saving an User without name', async () => {
    const user = new User({
      position: 'Node.js Developer'
    });

    try {
      await user.save();
    } catch (err) {
      expect(err.name).toEqual('ValidationError');
      expect(err.message)
        .toEqual('users validation failed: name: Path `name` is required.');
    } finally {
      expect(user.__v).not.toBeDefined();
    }
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });
});
