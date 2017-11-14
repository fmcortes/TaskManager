const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// Port of the app
const PORT = process.env.PORT || 5000

const app = express();



const options = {
   server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000}},
   replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000}}
};

// DB conection.
mongoose.connect(keys.mongoURI, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))

if (process.env.NODE_ENV !== 'test') {
   // 'combined' outputs the Apache style LOGs
   app.use(morgan('combined'));
}


// APP set Up
app.use(passport.initialize());

// Parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));


// Routes of the app
require('./routes/indexRoute')(app);
require('./user/routes/user.route')(app);
require('./tags/routes/tag.route')(app);

console.log('Listening on port ' + PORT);

app.listen(PORT);

// For testing
module.exports = app;