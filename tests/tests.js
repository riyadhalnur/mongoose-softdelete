var should = require('should'),
    mongoose = require('mongoose'),
    soft_delete = require('../src/mongoose-softdelete.js'),
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
var test1 = new Test();
var test2 = new Test({ deleted: true });

describe('Mongoose Softdelete Plugin', function () {
  it('should delete data in the DB', function (done) {
    test1.softdelete(function (err, newTest) {
      should.not.exist(err);
      newTest.deleted.should.be.true;
      done();
    });
  });

  it('should restore data from the DB', function (done) {
    test2.restore(function (err, newTest) {
      should.not.exist(err);
      newTest.deleted.should.be.false;
      done();
    });
  });
});