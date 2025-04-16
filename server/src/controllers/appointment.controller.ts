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
    const { doctorId, dateTime, notes } = req.body;
    const userId = (req as any).user.id;

    const existing = await Appointments.findOne({
      userId,
      dateTime: new Date(dateTime),
    });

    if (existing) {
      res.status(CONFLICT).json({
        error: `You already have an appoitment for this time with ${existing.doctor}`,
      });
      return;
    }

    const appointment = await Appointments.create({
      userId,
      doctorId,
      dateTime,
      notes,
    });

    await Users.findByIdAndUpdate(userId, {
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
    const userId = req.user?.id;
    console.log("userId :", userId);

    if (!userId) {
      res
        .status(UNAUTHORIZED)
        .json({ error: "Unauthorized: No user in request" });
      return;
    }

    const appointments = await Appointments.find({ userId })
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
  console.log({ past, upcoming });
  return [past, upcoming];
};
