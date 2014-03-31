var exports;

exports = module.exports = function(schema) {
  schema.add({ deleted_at: Date, deleted_by: String });

  schema.methods.bin = function(data, callback) {
    this.deleted_at = Date.now();
    this.deleted_by = data._id;
    this.save(callback);
  };

  schema.methods.unbin = function(data, callback) {
    this.deleted_at = null;
    this.deleted_by = null;
    this.save(callback);
  };
};
