import { Schema, model } from "mongoose";

export const classActionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "category", required: true },
  status: { type: String },
  defendants: [
    {
      type: String,
    },
  ],
  users: [
    {
      isWaiting: Boolean,
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      }
    }
  ],
  hashtags: [
    {
      type: String,
    },
  ],
  messages: [
    {
      _id: { type: Schema.Types.ObjectId },
      title: {
        type: String,
        trim: true,
        required: true,
      },
      content: {
        type: String,
        trim: true,
        required: true,
      },
      date: {
        type: Date,
        trim: true,
        required: true,
      },
    },
  ],
  leadingUser: { type: Schema.Types.ObjectId, ref: "user", required: true },
  representingLawyer: { type: String },
  openDate: { type: Date },
  reported: { type: Boolean },
  reportMessage: { type: String },
  successChances: { type: String },
});

const ClassActionModel = model("classAction", classActionSchema);

export default ClassActionModel;
