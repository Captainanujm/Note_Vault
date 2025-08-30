import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async (): Promise<void> => {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined.");
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
    process.exit(1); // Exit process if DB fails
  }
};

export default connectDB;
