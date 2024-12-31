import mongoose from "mongoose";

const subSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
  },
  { timestamps: true }
);

const Subscriber =
  mongoose.models.Subscriber || mongoose.model("Subscriber", subSchema);

export default Subscriber;
