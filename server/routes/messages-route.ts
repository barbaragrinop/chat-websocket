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
          unread: {
            $inc: 1,
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

  return router;
}
