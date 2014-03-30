var mongoose = require('mongoose'),
  models = require('./models.js'),
  soft_delete = require('src/mongoose-softdelete.js'),
  express = require('express');

var app = express();

// connect to mongo when app starts
mongoose.connect('mongodb://localhost/soft');

instance = new models.Test();
var user = {};
user._id = '21wf232efe312212';


app.get('/', function (req, res) {
  res.send('Hello!');
  instance.remove(user, function(err, doc) {
    console.log("after remove: doc.deleted_at:"+doc.deleted_at);
  });
});

app.listen(3000);