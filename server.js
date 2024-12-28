import express from "express";
import * as dotenv from "dotenv";
import userRouter from "./routes/user.route.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
