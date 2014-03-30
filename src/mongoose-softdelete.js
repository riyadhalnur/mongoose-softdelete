(function() {
  var time, user, toJSON;
  time = "deleted_at";
  user = "deleted_by";

  toJSON = function (key, type) {
    var json = {};
    json[key] = type;
    return json;
  };

  module.exports = function(schema) {
    schema.add(toJSON(time, Date));
    schema.add(toJSON(user, String));
    schema.methods.remove = function(data, callback) {
      this[time] = Date.now();
      this[user] = data._id;
      this.save(callback);
    };
    schema.methods.unremove = function(data, callback) {
      this[time] = null;
      this[user] = null;
      this.save(callback);
    };
  };
}).call(this);
