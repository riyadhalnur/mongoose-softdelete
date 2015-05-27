module.exports = function(schema) {
  schema.add({ deleted: Boolean });

  schema.pre('save', function (next) {
    if (!this.deleted) {
      this.deleted = false;
    }
    next();
  });

  schema.methods.softdelete = function(callback) {
    this.deleted = true;
    this.save(callback);
  };

  schema.methods.restore = function(callback) {
    this.deleted = false;
    this.save(callback);
  };
};
