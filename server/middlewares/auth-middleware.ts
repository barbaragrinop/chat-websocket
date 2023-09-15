import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

export default (req: Request, res: Response, next: NextFunction) => {
  dotenv.config();

  try {
    const token = req.headers.authorization?.split(" ")[1]!;

    if (token) {
      const decoded: any = verify(token, process.env.JWTSECRET!);

      req.body.userId = decoded.userId;
      next();
    }
  } catch (error: any) {
    console.error("[Auth Middleware Error]", error.message);

    res.status(401).json({
      message: error.message,
      success: false,
    });
  }
};
