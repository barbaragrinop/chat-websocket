import { Document } from "mongoose";

export interface IUserSchema extends Document {
  name: string;
  email: string;
  password: string;
  profilePic?: string;
}
