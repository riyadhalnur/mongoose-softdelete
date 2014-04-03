var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  soft_delete = require('src/mongoose-softdelete.js'),
  express = require('express');

var app = express();

// connect to mongo when app starts
mongoose.connect('mongodb://localhost/soft');

var TestSchema = new Schema({
  name: { type: String, default: 'Riyadh' },
  comment: { type: String, default: 'lalalalalalala' }
});

TestSchema.plugin(soft_delete);

var Test = mongoose.model('Test', TestSchema);
var test = new Test();
var user = {};
user._id = '21wf232efe312212';

app.get('/', function (req, res) {
  res.send('Hello!');
  test.softdelete(user, function(err, success) {
    console.log(success.delete);
  });
});

app.listen(3000);