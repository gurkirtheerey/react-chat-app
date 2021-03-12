// imports
import cors from "cors";
import connectToDB from "./db";
import { addMessage, addUser } from "../helpers/roomHelpers";
import RoomType from "../types/RoomType";
import dotenv from "dotenv";

// port
const PORT = process.env.PORT || 5000;

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
    origin: "http://localhost:5000",
  },
});

// connect to db
connectToDB();

io.on("connection", (socket) => {
  console.log(`${socket.id} has connected`);

  socket.on("join-room", async (room: RoomType, username: string) => {
    const { name } = room;
    socket.join(name);
    try {
      const updatedUsers = await addUser(room, username);
      let newUser = username;
      console.log(`${newUser} has joined room ${name}`);
      io.to(name).emit("new-user-joined", newUser, name, updatedUsers);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("leave-room", (room: RoomType, username: string) => {
    const { name } = room;
    socket.leave(name);
    let newUser = username;
    console.log(`${newUser} has left room ${name}`);
    io.to(name).emit("user-left", name, newUser);
  });

  socket.on("new-message", async (room, message, userId, username) => {
    try {
      let name = username;
      const updatedMessages = await addMessage(room, message, userId, name);
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

httpServer.listen(PORT, () => console.log(`Running on port ${PORT}`));
