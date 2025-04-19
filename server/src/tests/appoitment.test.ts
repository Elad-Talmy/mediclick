import mongoose from "mongoose";
import request from "supertest";
import jwt from "jsonwebtoken";
import { Doctors } from "../models/Doctor.model";
import { Appointments } from "../models/Appointment.model";
import { Users } from "../models/User.model";
import app from "../app";

describe("Appointment API", () => {
  let token: string;
  let doctorId: string;
  let time: string;
  const testPhone = "+1234567890";

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "test",
    });
    await Appointments.deleteMany();
    await Doctors.deleteMany();
    await Users.deleteMany();

    // Create test user
    let user = await Users.findOne({ phone: testPhone });
    if (!user) {
      user = await Users.create({ phone: testPhone, isVerified: true });
    }

    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    // Create test doctor
    const doctor = await Doctors.create({
      name: "Dr. Jest",
      specialty: "Unitology",
      availableSlots: ["2025-05-01T10:00:00.000Z"],
    });
    doctorId = doctor._id!.toString();
    time = doctor.availableSlots[0];
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("Appointment API", () => {
    it("should create an appointment and remove the slot from the doctor", async () => {
      const res = await request(app)
        .post("/api/appointments")
        .set("Authorization", `Bearer ${token}`)
        .send({
          doctor: doctorId,
          time,
          notes: "Test notes",
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("_id");

      const updatedDoctor = await Doctors.findById(doctorId);
      expect(updatedDoctor?.availableSlots).not.toContainEqual(time);
    });

    it("should prevent booking the same time slot again", async () => {
      const res = await request(app)
        .post("/api/appointments")
        .set("Authorization", `Bearer ${token}`)
        .send({
          doctor: doctorId,
          time,
        });

      expect(res.statusCode).toBe(409);
      expect(res.body.error).toMatch(/already have an appointment/i);
    });
  });
});
