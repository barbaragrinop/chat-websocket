import mongoose, { Schema } from "mongoose";
import { IUserMongoose } from "../types/IUserMongoose";

const schema = new Schema<IUserMongoose>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const UserSchema = mongoose.model<IUserMongoose>("users", schema);
