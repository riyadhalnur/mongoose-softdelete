var exports;

exports = module.exports = function(schema) {
  schema.add({ deleted: Boolean, deleted_by: String });

  schema.methods.softdelete = function(data, callback) {
    this.deleted = true;
    this.deleted_by = data._id;
    this.save(callback);
  };

  schema.methods.restore = function(data, callback) {
    this.deleted = false;
    this.deleted_by = null;
    this.save(callback);
  };
};
