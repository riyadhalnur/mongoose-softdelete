'use strict';

import should from 'should';
import mongoose from 'mongoose';

import softdelete from '../src/mongoose-softdelete.js';

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

TestSchema.plugin(softdelete);

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

  it('should be able to find using query method using defaults', function (done) {
    Test.find().isDeleted().exec(function (err, results) {
      should.not.exist(err);
      should.equal(results.length, 2);
      done();
    });
  });

  it('should be able to find using query method', function (done) {
    Test.find().isDeleted(false).exec(function (err, results) {
      should.not.exist(err);
      should.equal(results.length, 1);
      done();
    });
  });
});
