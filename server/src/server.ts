// imports
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import connectToDB from "./db";
import MessageType from "../types/MessageType";
import { addMessage } from "../helpers/roomHelpers";
import RoomType from "../types/RoomType";
import dotenv from "dotenv";

// config dotenv
dotenv.config();

// routes
import roomRoutes from "./routes/room";
import authRoutes from "./routes/auth";

// initialize express app, add middleware
const express = require("express");
const app = require("express")();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/room", roomRoutes);
app.use("/api/auth", authRoutes);

//initialize socket io server
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: process.env.API_URL,
  },
});

// connect to db
connectToDB();

io.on("connection", (socket) => {
  console.log(`${socket.id} has connected`);

  socket.on("join-room", (room: RoomType) => {
    const { name } = room;
    socket.join(name);
    console.log(`${socket.id} has joined room ${name}`);
    io.to(name).emit("new-user-joined", socket.id, name);
  });

  socket.on("leave-room", (room: RoomType) => {
    const { name } = room;
    socket.leave(name);
    console.log(`${socket.id} has left room ${name}`);
    io.to(name).emit("user-left", socket.id, name);
  });

  socket.on("new-message", async (room, message) => {
    try {
      const updatedMessages = await addMessage(room, message, socket.id);
      io.to(room.name).emit("update-messages", updatedMessages);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("a user has disconnected");
  });

  // io.emit("get-messages", messages);
});

httpServer.listen(5000, () => console.log("Running on port 5000"));
