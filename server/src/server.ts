import dotenv from "dotenv";
import app from "./app";
import { connectRedis } from "./utils/redisClient";
import { connectMongo } from "./utils/mongo";

dotenv.config();

const PORT = process.env.PORT || 5000;

const init = async () => {
  await connectMongo();
  await connectRedis();
  await app.listen(PORT, () =>
    console.log(`Mediclick API running on port ${PORT}`)
  );
};

init();
