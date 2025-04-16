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
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("POST /api/appointments should create a new appointment", async () => {
    const res = await request(app)
      .post("/api/appointments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        doctorId,
        dateTime: "2025-05-01T10:00:00.000Z",
        notes: "Test appointment",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.doctorId).toBe(doctorId);
  });

  it("GET /api/appointments should return user’s appointments", async () => {
    const res = await request(app)
      .get("/api/appointments")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
