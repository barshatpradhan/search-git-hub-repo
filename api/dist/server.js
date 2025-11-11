"use strict";
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import authRoutes from './Routes/auth';
// import favoritesRoutes from './Routes/favorites';
// import serverless from "serverless-http";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./Routes/auth"));
const favorites_1 = __importDefault(require("./Routes/favorites"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/auth", auth_1.default);
app.use("/api/favorites", favorites_1.default);
// MongoDB connection
const connectDB = async () => {
    try {
        mongoose_1.default.set("strictQuery", false);
        await mongoose_1.default.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000, // 10s before throwing error
        });
        console.log("✅ MongoDB connected successfully");
    }
    catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    }
};
connectDB();
// Basic route for testing
app.get("/", (req, res) => {
    res.send("🚀 Server is running successfully!");
});
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map