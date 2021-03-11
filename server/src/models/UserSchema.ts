import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

export default User;
