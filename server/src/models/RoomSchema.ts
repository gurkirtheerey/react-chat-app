import mongoose from "mongoose";

const { Schema } = mongoose;

const roomSchema = new Schema({
  name: String,
  messages: [{ userId: String, message: String }],
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
