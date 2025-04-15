import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectMongo = async () => {
  await mongoose.connect(process.env.MONGO_URI!, {
    dbName: process.env.MONGO_DB_NAME,
  });
  console.log("Mongo connected");
};
