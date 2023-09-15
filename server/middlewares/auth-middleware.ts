import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token!, process.env.JWTSECRET!);

    req.body.userId = (decoded as any).userId;
    next();
  } catch (error: any) {
    return res.status(401).json({
      message: "[Unauthorized]: " + error.message,
      success: false,
    });
  }
};
