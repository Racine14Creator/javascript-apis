import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const userSchema = new mongoose.Schema(
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
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsoundcloud.com%2Fjohn-doe-463064100%2Fsets%2Ffn&psig=AOvVaw0g6ofPwa0UuixXGhXAqEOn&ust=1735471404034000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLiBg_msyooDFQAAAAAdAAAAABAJ.jpeg",
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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Vérifier si le modèle existe déjà pour éviter les erreurs de redéclaration
export const User = mongoose.models.User || mongoose.model("User", userSchema);

// Export par défaut pour être compatible avec les imports ESM
export default User;

