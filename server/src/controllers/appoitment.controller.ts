import { Request, Response, NextFunction } from "express";
import { Appointments } from "../models/Appoitment.model";
import { CONFLICT, CREATED, OK } from "../utils/consts";

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
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const appointments = await Appointments.find({ userId })
      .populate("doctorId")
      .sort({ dateTime: -1 });

    res.status(OK).json(appointments);
  } catch (err) {
    next(err);
  }
};
