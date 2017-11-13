const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');


mongoose.connect(keys.mongoURI);

const app = express();

const PORT = process.env.PORT || 5000

app.get('/', function (req, res) {
   res.send({hi: 'there'})
});

app.listen(PORT);