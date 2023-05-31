import { Schema } from "mongoose";
import { IUser } from "../entities";

export const UserSchema = new Schema<IUser>(
  { username: String, password: String },
  {
    collection: "users",

    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },

    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
  }
);
