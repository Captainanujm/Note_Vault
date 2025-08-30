import express, { Request, Response } from "express";
import connectDB from "./db";
import { Router } from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Simple route
connectDB();
app.use("/api/auth",authRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript backend 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on ${PORT}`);
});
