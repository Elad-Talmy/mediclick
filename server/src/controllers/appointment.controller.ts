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

const splitAppts = (appointments: IAppointment[]) => {
  const [past, upcoming] = partition(
    appointments,
    (appt) => appt.time <= new Date()
  );

  return [past, upcoming];
};
