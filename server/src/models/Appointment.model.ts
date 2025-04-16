import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  userId: string;
  doctor: mongoose.Types.ObjectId;
  time: Date;
  notes?: string;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    userId: { type: String, ref: "Users", required: true },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctors", required: true },
    time: { type: Date, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Appointments = mongoose.model<IAppointment>(
  "Appointments",
  appointmentSchema
);
