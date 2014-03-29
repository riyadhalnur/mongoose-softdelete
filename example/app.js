var mongoose = require('mongoose'),
  models = require('./models.js'),
  soft_delete = require('src/mongoose-softdelete.js'),
  express = require('express');

var app = express();

// connect to mongo when app starts
mongoose.connect('mongodb://localhost/soft');

app.get('/', function (req, res) {
  res.send('Hello!');
});

app.listen(3000);