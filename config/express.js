'use strict';

const express = require('express'),
      morgan = require('morgan'), // provides a simple logger middleware
      compress = require('compression'), // provides response compression
      passport = require('passport'),
      bodyParser = require('body-parser'), // provides several middleware to handle request data
      cors = require('cors'); // enable cors

const app = express();

if (process.env.NODE_ENV !== 'test') {
  // 'combined' outputs the Apache Style Logs
  app.use(morgan('combined'));
}

if (process.env.NODE_ENV === 'production') {
  app.disable('x-powered-by');
}

// APP set Up
app.use(passport.initialize());

// Parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));
app.use(cors());

// Routes of the app
require('../routes/indexRoute')(app);
require('../src/user/routes/user.route')(app);
require('../src/tags/routes/tag.route')(app);

module.exports = app;
