import { ObjectId } from "mongodb";

export interface User {
  email: string;
  name: string;
  password: string;
  profilePic?: string;
  _id: ObjectId;
}
