import { NextFunction, Request, Response, Router } from "express";
// import { IChatSchema as Chat } from ;
import authMiddleware from "../middlewares/auth-middleware";
import { ChatSchema } from "../schema/chat-schema";

export function getChats() {
  const router = Router();

  // create new chat
  router.post(
    "/create-new-chat",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const newChat = new ChatSchema(req.body);
        const savedChat = await newChat.save();
        res.send({
          sucess: true,
          message: "Chat created successfully",
          data: savedChat,
        });
      } catch (error) {
        res.send({
          sucess: false,
          message: "Error creating chat: " + error,
        });
      }
    }
  );

  // get all current user chats
  router.get(
    "/get-all-chats",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const chats = await ChatSchema.find({
          members: {
            $in: [req.body.userId],
          },
        })
          .populate("members")
          .populate("lastMessage")
          .sort({
            updatedAt: -1,
          });
        res.send({
          success: true,
          message: "Chats fetched successfully",
          data: chats,
        });
      } catch (error) {
        res.send({
          success: false,
          message: "Error fetching chats: " + error,
        });
      }
    }
  );

  return router;
}
