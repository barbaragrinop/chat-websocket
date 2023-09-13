import { Document } from "mongoose";

export interface IUserMongoose extends Document {
  name: string;
  email: string;
  password: string;
  profilePic?: string;
}
