import mongoose from "mongoose";

const { Schema } = mongoose;

const roomSchema = new Schema({
  name: String,
  messages: [
    { userId: String, message: String, username: String, date: String },
  ],
  users: [{ userId: String, username: String }],
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
