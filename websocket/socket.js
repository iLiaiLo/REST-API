import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", //for testing environment
    allowedHeaders: "Content-Type",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`connected to ${socket.id}`);
  socket.on("disconnect", () => {
    console.log("disconnected from socket");
  });
});

export { io, app, server };
