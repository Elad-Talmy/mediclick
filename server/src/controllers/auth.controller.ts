import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/User.model";
import { FIVE_MINUTES_EXPIRY } from "../utils/consts";

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
      res.status(400).json({ error: "Phone number is required" });
      return;
    }

    let user = await User.findOne({ phone });
    if (!user) user = await User.create({ phone });

    user.otp = generateOTP();
    user.otpExpires = getOTPExpiry();
    await user.save();

    res.status(200).json({ otp: user.otp, phone, isNew: user.isVerified });
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
    const { phone, otp } = req.body;
    const user = await User.findOne({ phone });

    const isValidOTP =
      user &&
      user.otp === otp &&
      user.otpExpires &&
      user.otpExpires.getTime() > Date.now();

    if (!isValidOTP) {
      res.status(401).json({ error: "Invalid or expired OTP" });
      return;
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = createToken(user._id!.toString());

    res.status(200).json({
      token,
      user: {
        id: user._id,
        phone: user.phone,
      },
    });
  } catch (err) {
    next(err);
  }
};
