import { Request, Response, NextFunction } from "express";
import { Doctors } from "../models/Doctor.model";
import {
  BAD_REQUEST,
  CREATED,
  NOT_FOUND,
  OK,
  TEN_MINUTES_EXPIRY,
} from "../utils/consts";
import { redis } from "../utils/redisClient";

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
    const cached = await redis.get(cacheKey);
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

    await redis.set(cacheKey, JSON.stringify(doctors), {
      EX: TEN_MINUTES_EXPIRY,
    });
    res.json(doctors);
  } catch (err) {
    next(err);
  }
};
