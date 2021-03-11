import express from "express";
import mongoose from "mongoose";
import Room from "../models/RoomSchema";

const router = express.Router({ mergeParams: true });

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const rooms = await Room.find();
    res.send(rooms);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/test", async (req: express.Request, res: express.Response) => {
  const { _id } = req.query;
  try {
    const room = await Room.findById(_id);
    res.send(room);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req: express.Request, res: express.Response) => {
  try {
    const { name } = req.body;
    const room = new Room({ name });
    await room.save();
    const allRooms = await Room.find();
    res.send(allRooms);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

export default router;
