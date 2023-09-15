import { IMessageSchema } from "./IMessageschema";
import { IUserSchema } from "./IUserSchema";

export interface IChatSchema extends Document {
  members: IUserSchema[];
  lastMessage: IMessageSchema;
  unreadMessages: number;
}
