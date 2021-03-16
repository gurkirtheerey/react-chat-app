import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  avatar: String,
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
