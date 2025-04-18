import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { redisClient } from "../utils/redisClient";
import { WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const userSockets = new Map<string, WebSocket>();

wss.on("connection", (ws, req) => {
  const token = new URL(req.url!, "http://localhost").searchParams.get("token");
  let userId: string;

  try {
    const payload = jwt.verify(token!, process.env.JWT_SECRET!);
    userId = (payload as any).id;
    userSockets.set(userId, ws);

    console.log({ userId });
    ws.on("close", () => {
      userSockets.delete(userId);
    });
  } catch (e) {
    ws.close();
    return;
  }

  ws.on("message", async (message) => {
    const data = JSON.parse(message.toString());

    if (data.type === "subscribe") {
      const { doctorId } = data;
      console.log({ doctorId });
      await redisClient.sAdd(`waitlist:${doctorId}`, userId);
      await redisClient.sAdd(`user:${userId}:waitlist`, doctorId);
    }

    if (data.type === "unsubscribe") {
      const { doctorId } = data;
      console.log({ doctorId });

      await redisClient.sRem(`waitlist:${doctorId}`, userId);
      await redisClient.sRem(`user:${userId}:waitlist`, doctorId);
    }
  });
});

export const notifyDoctorSlotUpdate = async (
  doctorId: string,
  newSlot: string,
  doctorName: string
) => {
  const userIds = await redisClient.sMembers(`waitlist:${doctorId}`);
  for (const userId of userIds) {
    const ws = userSockets.get(userId);
    if (ws?.readyState === ws?.OPEN) {
      ws?.send(
        JSON.stringify({
          type: "slot_update",
          payload: {
            doctorId,
            slot: newSlot,
            doctorName,
          },
        })
      );
    }
  }
};
