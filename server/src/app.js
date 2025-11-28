import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import gameRoutes from "./routes/game.routes.js";

connectDB(); // OK on Vercel

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

export default app;   // <-- VERY IMPORTANT
