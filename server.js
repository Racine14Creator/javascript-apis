import express, { urlencoded } from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import userRouter from "./routes/user.route.js";

dotenv.config();
const app = express();
const DB = process.env.MONGO_URI

mongoose
  .connect(DB)
  .then(() => console.log(`Connected to mongoose`))
  .catch((err) => console.log(`Connection failed ${err.message}`));

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Go to /users to see all users");
});

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
