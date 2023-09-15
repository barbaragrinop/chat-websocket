import mongoose, { Schema } from "mongoose";
import { IUserSchema } from "../types/IUserSchema";

const schema = new Schema<IUserSchema>(
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

export const UserSchema = mongoose.model<IUserSchema>("users", schema);
