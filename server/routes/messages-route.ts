import express, { Router } from "express";
import { MessageSchema } from "../schema/message-schema";
import authMiddleware from "../middlewares/auth-middleware";
import { ChatSchema } from "../schema/chat-schema";

export function getMessages() {
  const router = Router();

  router.post("/new-message", authMiddleware, async (req, res) => {
    try {
      const newMessage = new MessageSchema(req.body);
      const savedMessage = await newMessage.save();

      // update last chat message
      await ChatSchema.findOneAndUpdate(
        {
          _id: req.body.chat,
        },
        {
          lastMessage: savedMessage._id,
          $inc: {
            unreadMessages: 1,
          },
        }
      );

      res.send({
        success: true,
        message: "Message sent successfully",
        data: savedMessage,
      });
    } catch (error: any) {
      res.send({
        success: false,
        message: "[Error sending message]: " + error,
      });
    }
  });

  router.get("/get-all-messages/:chatId", authMiddleware, async (req, res) => {
    try {
      const messages = await MessageSchema.find({
        chat: req.params.chatId,
      }).sort({ createdAt: 1 });

      res.send({
        success: true,
        message: "Messages fetched successfully",
        data: messages,
      });
    } catch (error: any) {
      res.send({
        success: false,
        message: "[Error fetching messages]: " + error,
      });
    }
  });

  // clear unread messages
  router.post("/reset-unread-messages", authMiddleware, async (req, res) => {
    console.log("req", req.body);
    try {
      // find chats and update unread messages count to 0
      const chat = await ChatSchema.findById(req.body.chatId);
      if (!chat) {
        return res.send({
          success: false,
          message: "Chat not found",
        });
      }

      const updatedChat = await ChatSchema.findByIdAndUpdate(
        req.body.chatId,
        {
          unreadMessages: 0,
        },
        {
          new: true,
        }
      )
        .populate("members")
        .populate("lastMessage");

      // find all unread messages of chat and update the them to read

      await MessageSchema.updateMany(
        {
          chat: req.body.chatId,
          read: false,
        },
        { read: true }
      );

      res.send({
        success: true,
        message: "Unread messages cleared successfully",
        data: updatedChat,
      });
    } catch (error: any) {
      res.send({
        success: false,
        message: "[Error clearing unread messages]: " + error,
      });
    }
  });
  return router;
}
