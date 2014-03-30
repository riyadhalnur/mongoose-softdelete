var mongoose = require('mongoose'),
  soft_delete = require('src/mongoose-softdelete.js'),
  Schema = mongoose.Schema;
 
var Test = new Schema({
  name: { type: String, default: 'Riyadh' },
  comment: { type: String, default: 'lalalalalalala' }
});

Test.plugin(soft_delete);

module.exports = {
  Test: mongoose.model('Test', Test)
};