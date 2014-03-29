(function() {
  module.exports = function(schema, data) {
    var keyname, deleted_by;
    schema.add({ keyname: null });
    schema.add({ deleted_by: null });
    schema.methods.remove = function(callback) {
      this[keyname] = Date.now();
      this[deleted_by] = data.user._id;
      this.save(callback);
    };
    schema.methods.unremove = function(callback) {
      this[keyname] = null;
      this[deleted_by] = null;
      this.save(callback);
    };
  };
}).call(this);
