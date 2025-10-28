// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import authRoutes from './Routes/auth';
// import favoritesRoutes from './Routes/favorites';
// import serverless from "serverless-http";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// //Routes 
// app.use('/api/auth', authRoutes);
// app.use('/api/favorites', favoritesRoutes);

// //MongoDB connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/github-explorer' )
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.error('MongoDB connection error:', err));

// app.listen(PORT, () => {
//     console.log(`Server running on port http://localhost:${PORT}`)
// });

// // Export as a Vercel serverless function
// export const handler = serverless(app);


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

// Middleware
app.use(cors());
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
    console.log(`✅ Server running on port ${PORT}`);
});

// Export as a Vercel serverless function
export const handler = serverless(app);
