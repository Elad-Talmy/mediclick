import {
  getCurrentUser,
  sendOTP,
  verifyOTP,
} from "../controllers/auth.controller";
import express from "express";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/get-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/user", verifyToken, getCurrentUser);

export default router;
