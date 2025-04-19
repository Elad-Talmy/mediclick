import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import {
  cancelAppointment,
  createAppointment,
  getUserAppointments,
} from "../controllers/appointment.controller";

const router = Router();

router.get("/", verifyToken, getUserAppointments);
router.post("/", verifyToken, createAppointment);
router.delete("/:id", verifyToken, cancelAppointment);

export default router;
