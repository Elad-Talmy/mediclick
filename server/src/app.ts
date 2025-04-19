import express from "express";
import cors from "cors";
import doctorRoutes from "./routes/doctor.routes";
import authRoutes from "./routes/auth.routes";
import appointmentRoutes from "./routes/appointment.routes";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

export default app;
