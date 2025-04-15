import { Request, Response, NextFunction } from "express";
import { Doctor } from "../models/Doctor.model";

export const getAllDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
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
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }

    res.status(200).json(doctor);
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
    const newDoctor = await Doctor.create({
      name,
      specialty,
      pfp,
      availableSlots,
    });
    res.status(201).json(newDoctor);
  } catch (err) {
    next(err);
  }
};
