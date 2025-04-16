import mongoose, { Schema, Document } from "mongoose";

export interface IDoctor extends Document {
  name: string;
  speciality: string;
  pfp?: string;
  availableSlots: string[];
}

const doctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    speciality: { type: String, required: true },
    pfp: String,
    availableSlots: [String],
  },
  { timestamps: true }
);

export const Doctors = mongoose.model<IDoctor>("Doctors", doctorSchema);
