import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import videoRoute from "./routes/video.js";
import commentRoute from "./routes/comment.js";
import cookieParser from "cookie-parser";

dotenv.config({ path: ".env" });

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/video", videoRoute);
app.use("/api/comment", commentRoute);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({
    success: false,
    status,
    message,
  });
});

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected"))
    .catch((err) => {
      throw err;
    });
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port " + PORT);
});
