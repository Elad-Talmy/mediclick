import { Request, Response, NextFunction } from "express";
import { Appointments } from "../models/Appointment.model";
import {
  CONFLICT,
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
  UNAUTHORIZED,
} from "../utils/consts";
import { AuthRequest } from "../middleware/auth.middleware";

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
        error: `You already have an appoitment for this time with ${existing.doctorId}`,
      });
      return;
    }

    const appointment = await Appointments.create({
      userId,
      doctorId,
      dateTime,
      notes,
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
      .populate("doctorId")
      .sort({ dateTime: -1 });

    res.status(OK).json(appointments);
  } catch (err) {
    console.error("Error in GET /appointments:", err);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch appointments" });
  }
};
