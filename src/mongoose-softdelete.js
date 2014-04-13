var exports;

exports = module.exports = function(schema) {
  schema.add({ deleted: Boolean, deletedBy: String });

  schema.pre('save', function (next) {
    if (!this.deleted) {
      this.deleted = false;
    }
    next();
  });

  schema.methods.softdelete = function(data, callback) {
    this.deleted = true;
    if (data) {
      this.deletedBy = data._id;
    }
    this.save(callback);
  };

  schema.methods.restore = function(data, callback) {
    this.deleted = false;
    if (data) {
      this.deletedBy = null;
    }
    this.save(callback);
  };
};
