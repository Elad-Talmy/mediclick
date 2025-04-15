import { sendOTP, verifyOTP } from "../controllers/auth.controller";
import express from "express";

const router = express.Router();

router.post("/get-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

export default router;
