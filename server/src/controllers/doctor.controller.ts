import { Request, Response, NextFunction } from "express";
import { Doctors } from "../models/Doctor.model";
import { CREATED, NOT_FOUND, OK } from "../utils/consts";

export const getAllDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const doctors = await Doctors.find();
    res.status(OK).json(doctors);
  } catch (err) {
    next(err);
  }
};

export const getDoctorById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const doctor = await Doctors.findById(id);

    if (!doctor) {
      res.status(NOT_FOUND).json({ error: "Doctor not found" });
      return;
    }

    res.status(OK).json(doctor);
  } catch (err) {
    next(err);
  }
};

export const createDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, specialty, pfp, availableSlots } = req.body;
    const newDoctor = await Doctors.create({
      name,
      specialty,
      pfp,
      availableSlots,
    });
    res.status(CREATED).json(newDoctor);
  } catch (err) {
    next(err);
  }
};
