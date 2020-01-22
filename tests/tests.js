'use strict';

const should = require('should');
const mongoose = require('mongoose');
    
const soft_delete = require('../src/mongoose-softdelete.js');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/softtest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error: please check if mongodb is running on localhost'));

const TestSchema = new Schema({
  name: { type: String, default: 'Riyadh' },
  comment: { type: String, default: 'lalalalalalala' }
});

TestSchema.plugin(soft_delete);

const Test = mongoose.model('Test', TestSchema);
const test1 = new Test();
const test2 = new Test();
const test3 = new Test({ deleted: true });

describe('Mongoose Softdelete Plugin', function () {
  it('should add fields to schema if they do not exist already', function (done) {
    (test1.deletedAt === undefined).should.be.true;
    (test1.deleted === undefined).should.be.true;

    test1.softdelete(function (err, newTest) {
      should.not.exist(err);
      newTest.deleted.should.exist;
      newTest.deletedAt.should.exist;
      done();
    });
  });

  it('should delete data in the DB', function (done) {
    test2.softdelete(function (err, newTest) {
      should.not.exist(err);
      newTest.deleted.should.be.true;
      newTest.deletedAt.should.be.an.instanceOf(Date);
      done();
    });
  });

  it('should restore data from the DB', function (done) {
    test3.restore(function (err, newTest) {
      should.not.exist(err);
      newTest.deleted.should.be.false;
      (newTest.deletedAt === null).should.be.true;
      done();
    });
  });
});