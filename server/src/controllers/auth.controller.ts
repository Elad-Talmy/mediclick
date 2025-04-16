import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Users } from "../models/User.model";
import {
  BAD_REQUEST,
  FIVE_MINUTES_EXPIRY,
  OK,
  UNAUTHORIZED,
} from "../utils/consts";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const getOTPExpiry = (): Date => {
  return new Date(FIVE_MINUTES_EXPIRY);
};

const createToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};

export const sendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { phone } = req.body;
    if (!phone) {
      res.status(BAD_REQUEST).json({ error: "Phone number is required" });
      return;
    }
    let user = await Users.findOne({ phone });
    if (!user) {
      user = await Users.create({ phone });
    }

    user.otp = generateOTP();
    user.otpExpires = getOTPExpiry();
    await user.save();

    res.status(OK).json({ otp: user.otp, phone });
  } catch (err) {
    next(err);
  }
};

export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { phone, otp, name } = req.body;
    const user = await Users.findOne({ phone });

    const isValidOTP =
      user &&
      user.otp === otp &&
      user.otpExpires &&
      user.otpExpires.getTime() > Date.now();

    if (!isValidOTP) {
      res.status(UNAUTHORIZED).json({ error: "Invalid or expired OTP" });
      return;
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.name = name;
    user.firstActionCompleted = user.firstActionCompleted ?? false;
    await user.save();

    const token = createToken(user._id!.toString());

    res.status(OK).json({
      token,
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user = await Users.findById(req.user?.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({
      id: user._id,
      phone: user.phone,
      isNew: !user.firstActionCompleted,
      name: user.name,
    });
    console.log({
      id: user._id,
      phone: user.phone,
      isNew: !user.firstActionCompleted,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to get user" });
    return;
  }
};
