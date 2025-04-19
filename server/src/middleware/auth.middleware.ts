import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { BAD_REQUEST, UNAUTHORIZED } from "../utils/consts";

interface JwtPayload {
  id: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}
export interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(UNAUTHORIZED).json({ error: "Missing token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(BAD_REQUEST).json({ error: "Invalid token" });
    return;
  }
};
