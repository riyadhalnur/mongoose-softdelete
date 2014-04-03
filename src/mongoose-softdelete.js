var exports;

exports = module.exports = function(schema) {
  schema.add({ delete: Boolean, deleted_by: String });

  schema.methods.softdelete = function(data, callback) {
    this.delete = true;
    this.deleted_by = data._id;
    this.save(callback);
  };

  schema.methods.restore = function(data, callback) {
    this.delete = false;
    this.deleted_by = null;
    this.save(callback);
  };
};
