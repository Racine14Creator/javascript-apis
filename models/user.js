import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
      match: /^[a-zA-Z0-9_]*$/,
    },
    password: { type: String, required: true, trim: true, minlength: 6 },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dkkgmzv6w/image/upload/v1631263152/avatar/avatar-1.png",
    },
    bio: { type: String, default: "" },
    followers: { type: [String], default: [] },
    following: { type: [String], default: [] },
    saved: { type: [String], default: [] },
    resetToken: { type: String, default: "" },
    expireToken: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
