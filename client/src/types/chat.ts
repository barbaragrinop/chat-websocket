import { ObjectId } from "mongodb";
import { Message } from "./messages";
import { User } from "./user";

export interface Chat {
  members: User[];
  lastMessage: Message;
  unreadMessages: number;
  _id?: ObjectId;
}
