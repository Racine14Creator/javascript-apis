import express, { urlencoded } from "express";

import * as dotenv from "dotenv";

import mongoose from "mongoose";

import connectDB from "./lib/db.mongodb.js";

import userRouter from "./routes/user.route.js";

import testRouter from "./routes/test.route.js";

import subRouter from "./routes/subscribers.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Go to /users to see all users");
});

app.use("/users", userRouter);

app.use("/test", testRouter);

app.use("/subscribers", subRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port http://localhost:${PORT}`);
});
