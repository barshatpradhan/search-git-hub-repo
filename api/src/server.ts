import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./Routes/auth";
import favoritesRoutes from "./Routes/favorites";
import serverless from "serverless-http";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewar
app.use(cors({
  origin: [
    'https://search-git-hub-repo.vercel.app', // your deployed frontend
    // 'https://search-git-hub-repo.onrender.com'
    'http://localhost:5173' // local Vite dev
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoritesRoutes);

// MongoDB connection
const connectDB = async (): Promise<void> => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGODB_URI as string, {
            serverSelectionTimeoutMS: 10000, // 10s before throwing error
        });
        console.log("✅ MongoDB connected successfully");
    } catch (err: any) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    }
}
connectDB();

// Basic route for testing
app.get("/", (req, res) => {
    res.send("🚀 Server is running successfully!");
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port http://localhost:${PORT}`);
});

// Export as a Vercel serverless function
export const handler = serverless(app);
