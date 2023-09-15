import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserSchema } from "../schema/user.schema";
import { IUserSchema } from "../types/IUserSchema";
import authMiddleware from "../middlewares/auth-middleware";
import jwt from "jsonwebtoken";

export function getUserRoutes() {
  const router = Router();

  // User registration
  router.post("/register", async (req: Request, res: Response) => {
    try {
      // Check if user already exists
      const user = await UserSchema.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      // Create a new user
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser: IUserSchema = new UserSchema({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        profilePic: req.body.profilePic,
      });

      await newUser.save();
      res.status(201).json({
        success: true,
        message: "User created successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  });

  // User login
  router.post("/login", async (req: Request, res: Response) => {
    try {
      // Check if user exists
      const user = await UserSchema.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User does not exist",
        });
      }

      // Check if password is correct
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json({
          success: false,
          message: "Invalid password",
        });
      }

      // Create and assign a token
      // @ts-ignore
      const token = jwt.sign({ userId: user._id }, process.env.JWTSECRET, {
        expiresIn: "1d",
      });
      console.log("process.env.JWTSECRET,", process.env.JWTSECRET);
      console.log("[LOGIN TOKEN]", token);

      res.json({
        success: true,
        message: "User logged in successfully",
        data: token,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  });

  router.get(
    "/get-current-user",
    authMiddleware,
    async (req: Request, res: Response) => {
      try {
        const currentUser = await UserSchema.findOne({
          _id: req.body.userId,
        });

        if (currentUser === null) {
          return res.status(400).json({
            success: false,
            message: "User not found",
          });
        }

        res.json({
          success: true,
          data: currentUser,
          message: "User found successfully",
        });
      } catch (error: any) {
        res.status(500).json({
          message: error.message,
          success: false,
        });
      }
    }
  );

  router.get(
    "/get-all-users",
    authMiddleware,
    async (req: Request, res: Response) => {
      try {
        const users = await UserSchema.find({
          _id: {
            $ne: req.body.userId,
          },
        });

        res.status(200).json({
          success: true,
          message: "Users fetched successfully",
          data: users,
        });
      } catch (error) {
        res.send({
          success: false,
          message: error,
        });
      }
    }
  );

  return router;
}
