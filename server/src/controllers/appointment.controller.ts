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
import { Doctors } from "../models/Doctor.model";

export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { doctor, time, notes } = req.body;
    const user = (req as any).user.id;

    const existing = await Appointments.findOne({
      user,
      time,
    });

    if (existing) {
      res.status(CONFLICT).json({
        error: `You already have an appoitment for this time with ${existing.doctor}`,
      });
      return;
    }

    const appointment = await Appointments.create({
      user,
      doctor,
      time,
      notes,
    });

    await Users.findByIdAndUpdate(user, {
      firstActionCompleted: true,
    });

    await Doctors.findByIdAndUpdate(doctor, {
      $pull: { availableSlots: time },
    });

    res.status(CREATED).json(appointment);
  } catch (err) {
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

    const appointment = await Appointments.findOne({ _id: id, user: userId });

    if (!appointment) {
      res.status(404).json({ error: "Appointment not found" });
      return;
    }
    console.log(new Date(appointment.time).toISOString());
    await Doctors.findByIdAndUpdate(appointment.doctor, {
      $addToSet: { availableSlots: new Date(appointment.time).toISOString() },
    });

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
