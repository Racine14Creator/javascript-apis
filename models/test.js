import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["public", "private"],
      required: true,
      default: "public",
    },
  },
  { timestamps: true }
);

export const Test = mongoose.models.Test || mongoose.model("Test", testSchema);

export default Test;
