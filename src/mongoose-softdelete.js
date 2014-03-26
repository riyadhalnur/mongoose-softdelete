(function() {
  var key_name, dateJSON, exports;

  key_name = "deleted_at";

  dateJSON = function(key) {
    var json;
    json = {};
    json[key] = Date;
    return json;
  };

  module.exports = exports = function(schema, options) {
    var keyName;
    keyName = (options || {}).keyName || key_name;
    schema.add(dateJSON(keyName));
    schema.methods.remove = function(callback) {
      this[keyName] = Date.now();
      this.save(callback);
    };
    return schema.methods.unremove = function(callback) {
      this[keyName] = null;
      this.save(callback);
    };
  };
}).call(this);
