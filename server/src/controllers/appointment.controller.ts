import { Request, Response, NextFunction } from "express";
import { Appointments, IAppointment } from "../models/Appointment.model";
import {
  CONFLICT,
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
  UNAUTHORIZED,
} from "../utils/consts";
import { AuthRequest } from "../middleware/auth.middleware";
import { partition } from "lodash";
import { Users } from "../models/User.model";
import { Doctors, IDoctor } from "../models/Doctor.model";
import { notifyDoctorSlotUpdate } from "../socket/waitlistSocket";
import mongoose from "mongoose";

export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { doctor, time, notes } = req.body;
    const userId = (req as any).user.id;

    // Ensure user doesn’t already have an appointment at this time
    const existing = await Appointments.findOne({ user: userId, time }).session(
      session
    );
    if (existing) {
      await session.abortTransaction();
      session.endSession();
      res.status(CONFLICT).json({
        error: `You already have an appointment for this time with ${existing.doctor}`,
      });
      return;
    }

    // Check that the slot still exists
    const doctorDoc = await Doctors.findOne({
      _id: doctor,
      availableSlots: time,
    }).session(session);

    if (!doctorDoc) {
      await session.abortTransaction();
      session.endSession();
      res
        .status(CONFLICT)
        .json({ error: "Selected time slot is no longer available." });
      return;
    }

    // Create the appointment
    const appointment = await Appointments.create(
      [
        {
          user: userId,
          doctor,
          time,
          notes,
        },
      ],
      { session }
    );

    // Remove the slot from the doctor's availability
    await Doctors.findByIdAndUpdate(
      doctor,
      { $pull: { availableSlots: time } },
      { session }
    );

    // Update user profile
    await Users.findByIdAndUpdate(
      userId,
      { firstActionCompleted: true },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(CREATED).json(appointment[0]);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

export const getUserAppointments = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user?.id;

    if (!user) {
      res
        .status(UNAUTHORIZED)
        .json({ error: "Unauthorized: No user in request" });
      return;
    }

    const appointments = await Appointments.find({ user })
      .populate("doctor")
      .sort({ time: -1 });

    const [past, upcoming] = splitAppts(appointments);

    res.status(OK).json({ past, upcoming });
  } catch (err) {
    console.error("Error in GET /appointments:", err);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch appointments" });
  }
};

export const cancelAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const appointment = (await Appointments.findOne({
      _id: id,
      user: userId,
    }).populate("doctor")) as unknown as IAppointment & { doctor: IDoctor };

    if (!appointment) {
      res.status(404).json({ error: "Appointment not found" });
      return;
    }

    const newSlot = new Date(appointment.time).toISOString();

    await Doctors.findByIdAndUpdate(appointment.doctor._id, {
      $addToSet: { availableSlots: newSlot },
    });

    notifyDoctorSlotUpdate(
      appointment.doctor._id.toString(),
      newSlot,
      appointment.doctor.name
    );

    await Appointments.findByIdAndDelete(id);

    res.status(200).json({ message: "Appointment canceled successfully" });
  } catch (err) {
    next(err);
  }
};

const splitAppts = (appointments: IAppointment[]) => {
  const [past, upcoming] = partition(
    appointments,
    (appt) => appt.time <= new Date()
  );

  return [past, upcoming];
};
