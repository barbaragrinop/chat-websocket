import mongoose from "mongoose";
import { IChatSchema } from "../types/IChatSchema";

const chatSchema = new mongoose.Schema(
  {
    members: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
      ],
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "messages",
    },
    unreadMessages: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const ChatSchema = mongoose.model<IChatSchema>("chats", chatSchema);
