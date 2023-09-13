import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserSchema } from "../schema/user-schema";
import { IUserMongoose } from "../types/IUserMongoose";

// const router = Router();

// // User registration
// router.post("/register", async (req: Request, res: Response) => {
//   console.log("res", res);
//   console.log("req", req);
//   try {
//     // Check if user already exists
//     const user = await UserSchema.findOne({ email: req.body.email });
//     if (user) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     // Create a new user
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const newUser: IUserMongoose = new UserSchema({
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword,
//       profilePic: req.body.profilePic,
//     });

//     await newUser.save();
//     res.status(201).json({
//       success: true,
//       message: "User created successfully",
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// });

// // User login
// router.post("/login", async (req: Request, res: Response) => {
//   try {
//     // Check if user exists
//     const user = await UserSchema.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User does not exist",
//       });
//     }

//     // Check if password is correct
//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!validPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid password",
//       });
//     }

//     // Create and assign a token
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWTSECRET as string,
//       {
//         expiresIn: "1d",
//       }
//     );
//     res.json({
//       success: true,
//       message: "User logged in successfully",
//       data: token,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// });

// router.get("/all-users", async (req: Request, res: Response) => {
//   try {
//     const users = await UserSchema.find();
//     if (!users) {
//       return res.status(400).json({
//         success: false,
//         message: "No users found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: users,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// export default router;

export function getUserRoutes() {
  const router = Router();

  // User registration
  router.post("/register", async (req: Request, res: Response) => {
    console.log("res", res);
    console.log("req", req);
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
      const newUser: IUserMongoose = new UserSchema({
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
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWTSECRET as string,
        {
          expiresIn: "1d",
        }
      );
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

  router.get("/all", async (req: Request, res: Response) => {
    try {
      const users = await UserSchema.find();
      if (!users) {
        return res.status(400).json({
          success: false,
          message: "No users found",
        });
      }

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.log(error);
    }
  });

  return router;
}
