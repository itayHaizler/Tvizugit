import { Schema, model } from "mongoose";

export const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  displayName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    ref: "userRole"
  },
});

const UserModel = model("user", userSchema);

export default UserModel;
