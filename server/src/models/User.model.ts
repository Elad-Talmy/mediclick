import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  phone: string;
  isVerified: boolean;
  name: string;
  otp?: string;
  otpExpires?: Date;
  firstActionCompleted?: boolean;
}

const userSchema = new Schema<IUser>(
  {
    phone: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    name: String,
    otp: String,
    otpExpires: Date,
    firstActionCompleted: Boolean,
  },
  { timestamps: true }
);

export const Users = mongoose.model<IUser>("Users", userSchema);
