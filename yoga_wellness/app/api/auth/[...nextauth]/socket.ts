// pages/api/socket.ts
import { Server } from "socket.io";

export default function handler(req: any, res: any) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: "/api/socket",
      cors: { origin: "*" },
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      // Handle incoming chat messages
      socket.on("chatMessage", (msg) => {
        console.log("Message received:", msg);
        io.emit("chatMessage", msg); // ✅ Broadcast message to all clients
      });

      // Handle streaming offer
      socket.on("offer", (offer) => {
        socket.broadcast.emit("offer", offer);
      });

      socket.on("answer", (answer) => {
        socket.broadcast.emit("answer", answer);
      });

      socket.on("ice-candidate", (candidate) => {
        socket.broadcast.emit("ice-candidate", candidate);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }
  res.end();
}
