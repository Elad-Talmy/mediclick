import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import {
  getUserAppointments,
  createAppointment,
} from "../controllers/appoitment.controller";

const router = Router();

router.get("/", verifyToken, getUserAppointments);
router.post("/", verifyToken, createAppointment);

export default router;
