import { Chat } from "./chat";
import { User } from "./user";

export interface Message {
  chat: Chat;
  sender: User;
  text: string;
  read: boolean;
  createdAt?: Date;
}
