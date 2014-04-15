var assert = require('assert'),
    mongoose = require('mongoose'),
    soft_delete = require('src/mongoose-softdelete.js'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/softtest');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: please check if mongodb is running on localhost'));
db.once('open', function callback () {
  console.log('Database connection made');
});

var TestSchema = new Schema({
  name: { type: String, default: 'Riyadh' },
  comment: { type: String, default: 'lalalalalalala' }
});

TestSchema.plugin(soft_delete);

var Test = mongoose.model('Test', TestSchema);
var test = new Test();

describe("Plugin Test", function() {
  it("should delete/restore data in the DB", function(done) {

    test.softdelete(function(err, success) {
      if (err) { console.log('Error deleting data!'); }
      assert.equal(success.deleted, true);
      console.log(success.deleted);
    });

    test.restore(user, function(err, success) {
      if (err) { console.log('Error restoring data!'); }
      assert.equal(success.deleted, false);
      console.log(success.deleted);
    });
  });
});