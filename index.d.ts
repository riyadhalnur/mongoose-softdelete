import { Document, Model, Query } from 'mongoose';

export interface ISoftDeletedDocument extends Document {
  deleted: Boolean;
  deletedAt: Date;
};

export interface ISoftDeletedModel extends ISoftDeletedDocument {
  softdelete: (
    callback: (err: any, model: Model<ISoftDeletedDocument>) => void
  ) => void;

  restore: (
    callback: (err: any, model: Model<ISoftDeletedDocument>) => void
  ) => void;
};

export interface ISoftDeletedQuery extends Query {
  isDeleted: (cond: Boolean = true) => Query;
};