const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// DB conection.
mongoose.connect(keys.mongoURI);

const app = express();

// APP set Up
app.use(passport.initialize());
app.use(bodyParser.json())

// Port of the app
const PORT = process.env.PORT || 5000

// Routes of the app
require('./routes/indexRoute')(app)

app.listen(PORT);