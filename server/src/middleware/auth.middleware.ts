import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UNAUTHORIZED } from "../utils/consts";

interface JwtPayload {
  id: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(UNAUTHORIZED).json({ error: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(UNAUTHORIZED).json({ error: "Invalid token" });
  }
};
