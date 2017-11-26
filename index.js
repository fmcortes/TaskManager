process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const keys = require('./config/config');
const mongoose = require('mongoose');

const app = require('./config/express');
// Port of the app
const PORT = process.env.PORT || 5000

const options = {
  useMongoClient: true
};

// DB conection.
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});

module.exports = app;
