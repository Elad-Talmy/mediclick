import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import {
  createAppointment,
  getUserAppointments,
} from "../controllers/appointment.controller";

const router = Router();

router.get("/", verifyToken, getUserAppointments);
router.post("/", verifyToken, createAppointment);

export default router;
