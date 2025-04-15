import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import { Doctors } from "../models/Doctor.model";

describe("Doctor API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "test",
    });
    await Doctors.deleteMany();
    await Doctors.create({
      name: "Dr. Test",
      specialty: "Testing",
      availableSlots: ["2025-04-30T10:00:00.000Z"],
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("GET /api/doctors should return at least one doctor", async () => {
    const res = await request(app).get("/api/doctors");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
