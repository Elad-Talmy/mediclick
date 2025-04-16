import { Router } from "express";
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  searchDoctors,
  getDoctorsBySpeciality,
  getSpecialities,
} from "../controllers/doctor.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/search", searchDoctors);
router.get("/speciality", getSpecialities);
router.post("/speciality", getDoctorsBySpeciality);
router.get("/", getAllDoctors);
router.post("/", verifyToken, createDoctor);

export default router;
