import { Request, Response, NextFunction } from "express";
import { Doctors } from "../models/Doctor.model";
import {
  BAD_REQUEST,
  CREATED,
  NOT_FOUND,
  OK,
  TEN_MINUTES_EXPIRY,
} from "../utils/consts";
import { redisClient } from "../utils/redisClient";

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

export const getDoctorsById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { ids } = req.body;
    const doctors = await Doctors.find({ _id: { $in: ids } });

    if (!doctors) {
      res.status(NOT_FOUND).json({ error: "Doctors not found" });
      return;
    }

    res.status(OK).json(doctors);
  } catch (err) {
    next(err);
  }
};

export const getDoctorsBySpecialty = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { specialty } = req.body;
    const doctors = await Doctors.find({ specialty: { $regex: specialty } });

    res.status(OK).json(doctors);
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

export const searchDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = (req.query.doctor as string)?.trim();
    if (!query) {
      res.status(BAD_REQUEST).json({ error: "Missing search query" });
      return;
    }

    const cacheKey = `doctor-search:${query.toLowerCase()}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      res.json(JSON.parse(cached));
      return;
    }

    const doctors = await Doctors.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { specialty: { $regex: query, $options: "i" } },
      ],
    }).limit(10);

    await redisClient.set(cacheKey, JSON.stringify(doctors), {
      EX: TEN_MINUTES_EXPIRY,
    });
    res.json(doctors);
  } catch (err) {
    next(err);
  }
};

export const getSpecialities = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const specialties = new Set<string>();

    const doctors = await Doctors.find();

    doctors.forEach((doc) => {
      if (doc.specialty) specialties.add(doc.specialty.trim());
    });

    res.status(200).json([...specialties]);
  } catch (err) {
    next(err);
  }
};
