import { IChatSchema } from "./IChatSchema";
import { IUserSchema } from "./IUserSchema";

export interface IMessageSchema extends Document {
  chat: IChatSchema;
  sender: IUserSchema;
  text: string;
  read: boolean;
}
