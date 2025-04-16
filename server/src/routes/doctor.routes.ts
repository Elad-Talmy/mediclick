import { Router } from "express";
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  searchDoctors,
  getDoctorsBySpecialty,
  getSpecialities,
} from "../controllers/doctor.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/search", searchDoctors);
router.get("/specialty", getSpecialities);
router.post("/specialty", getDoctorsBySpecialty);
router.get("/", getAllDoctors);
router.post("/", verifyToken, createDoctor);

export default router;
