import { Router } from "express";
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  searchDoctors,
} from "../controllers/doctor.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/search", searchDoctors);
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.post("/", verifyToken, createDoctor);

export default router;
