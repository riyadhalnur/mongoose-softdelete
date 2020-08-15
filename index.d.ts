import { Document, Model, Query, Schema, DocumentQuery } from "mongoose";

export interface ISoftDeletedDocument extends Document {
  deleted: Boolean;
  deletedAt: Date;
  softdelete: (
    callback: (err: any, model: ISoftDeletedDocument) => void
  ) => void;
  restore: (callback: (err: any, model: ISoftDeletedDocument) => void) => void;
}

export type ISoftDeletedModel = Model<ISoftDeletedDocument>;

interface IQueryMethods {
  isDeleted: (condition: Boolean) => Query<ISoftDeletedDocument>;
}

export type ISoftDeletedQuery = Query<ISoftDeletedDocument> & IQueryMethods;
export type ISoftDeletedDocumentQuery = DocumentQuery<
  ISoftDeletedDocument[],
  ISoftDeletedDocument
> &
  IQueryMethods;

export default function (schema: Schema<any>): void;
