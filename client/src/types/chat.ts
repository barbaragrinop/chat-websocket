import { Message } from "./messages";
import { User } from "./user";

export interface Chat {
  members: User[];
  lastMessage: Message;
  unreadMessages: number;
}
