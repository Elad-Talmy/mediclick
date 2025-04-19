import { Server as HTTPServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { redisClient } from "../utils/redisClient";

const userSockets = new Map<string, WebSocket>();

export const setupSocket = (server: HTTPServer) => {
  const wss = new WebSocketServer({ server, path: "/ws" });

  wss.on("connection", (ws, req) => {
    const url = new URL(req.url!, process.env.CLIENT_URL);
    const token = url.searchParams.get("token");
    let userId: string;

    try {
      const payload = jwt.verify(token!, process.env.JWT_SECRET!);
      userId = (payload as any).id;
      userSockets.set(userId, ws);

      ws.on("close", () => {
        userSockets.delete(userId);
      });
    } catch {
      ws.close();
      return;
    }

    ws.on("message", async (message) => {
      const data = JSON.parse(message.toString());

      if (data.type === "subscribe") {
        await redisClient.sAdd(`waitlist:${data.doctorId}`, userId);
        await redisClient.sAdd(`user:${userId}:waitlist`, data.doctorId);
      }

      if (data.type === "unsubscribe") {
        await redisClient.sRem(`waitlist:${data.doctorId}`, userId);
        await redisClient.sRem(`user:${userId}:waitlist`, data.doctorId);
      }
    });
  });
};

export const notifyDoctorSlotUpdate = async (
  doctorId: string,
  newSlot: string,
  doctorName: string
) => {
  const userIds = await redisClient.sMembers(`waitlist:${doctorId}`);
  for (const userId of userIds) {
    const ws = userSockets.get(userId);
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "slot_update",
          payload: { doctorId, slot: newSlot, doctorName },
        })
      );
    }
  }
};
