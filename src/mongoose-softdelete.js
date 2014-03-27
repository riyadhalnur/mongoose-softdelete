(function() {
  var dateJSON, exports;

  dateJSON = function(key) {
    var json;
    json = {};
    json[key] = Date;
    return json;
  };

  module.exports = exports = function(schema, options) {
    var keyName;
    keyName = "deleteFlag";
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
