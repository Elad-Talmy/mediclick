import dotenv from "dotenv";
import app from "./app";
import http from "http";
import { connectRedis } from "./utils/redisClient";
import { connectMongo } from "./utils/mongo";
import { setupSocket } from "./socket/waitlistSocket";

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const init = async () => {
  await connectMongo();
  await connectRedis();
  server.listen(PORT, () => {
    console.log(`🌐 Server is running on port ${PORT}`);
    setupSocket(server);
  });
};

init();
