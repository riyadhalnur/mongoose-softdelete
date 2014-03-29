var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
 
var Test = new Schema({
  name: { type: String },
  comment: { type: String }
});
 
module.exports = {
  Test: mongoose.model('Test', Test)
};