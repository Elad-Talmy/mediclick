import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  phone: string;
  isVerified: boolean;
  otp?: string;
  otpExpires?: Date;
}

const userSchema = new Schema<IUser>(
  {
    phone: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    otp: String,
    otpExpires: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
