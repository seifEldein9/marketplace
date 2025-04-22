import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use("/api", userRoutes);
app.use(errorHandler);

export default app;
