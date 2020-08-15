import { Document, Model, Query } from 'mongoose';

export interface ISoftDeletedDocument extends Document {
  deleted: Boolean;
  deletedAt: Date;
  softdelete: (callback: (err: any, model: ISoftDeletedDocument) => void) => void;
  restore: (callback: (err: any, model: ISoftDeletedDocument) => void) => void;
}

export type ISoftDeletedModel = Model<ISoftDeletedDocument>;

export interface ISoftDeletedQuery extends Query<any> {
  isDeleted: (condition: Boolean) => Query<any>;
}