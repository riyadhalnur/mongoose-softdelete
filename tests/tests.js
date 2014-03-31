var assert = require('assert'),
    mongoose = require('mongoose'),
    soft_delete = require('src/mongoose-softdelete.js'),
    models = require('example/models.js'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/softtest');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: please check if mongodb is running on localhost'));
db.once('open', function callback () {
  console.log('Database connection made');
});

describe("Plugin Test", function() {
  it("should bin/unbin data in the DB", function(done) {
    instance = new models.Test();
    var user = {};
    user._id = '21wf232efe312212';

    instance.bin(user, function(err, success) {
      if (err) { console.log('Error deleting data!'); }
      assert.equal(success.deleted_at, Date.now());
      console.log(success.deleted_at);
    });

    instance.unbin(user, function(err, success) {
      if (err) { console.log('Error restoring data!'); }
      assert.equal(success.deleted_at, null);
      console.log(success.deleted_at);
    });
  });
});