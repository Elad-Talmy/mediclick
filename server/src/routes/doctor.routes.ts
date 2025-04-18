import { Router } from "express";
import {
  getAllDoctors,
  createDoctor,
  searchDoctors,
  getDoctorsBySpecialty,
  getSpecialities,
  getDoctorsById,
} from "../controllers/doctor.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/search", searchDoctors);
router.get("/specialty", getSpecialities);
router.post("/specialty", getDoctorsBySpecialty);
router.post("/id", getDoctorsById);
router.get("/", getAllDoctors);
router.post("/", verifyToken, createDoctor);

export default router;
