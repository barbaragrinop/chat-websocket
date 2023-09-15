import mongoose from "mongoose";
import { IMessageSchema } from "../types/IMessageschema";

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chats",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    text: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const MessageSchema = mongoose.model<IMessageSchema>(
  "messages",
  messageSchema
);
