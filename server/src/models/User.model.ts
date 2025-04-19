import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  phone: string;
  name: string;
  firstActionCompleted?: boolean;
}

const userSchema = new Schema<IUser>(
  {
    phone: { type: String, required: true, unique: true },
    name: String,
    firstActionCompleted: Boolean,
  },
  { timestamps: true }
);

export const Users = mongoose.model<IUser>("Users", userSchema);
