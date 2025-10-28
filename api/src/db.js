// // db.js
// import mongoose from "mongoose";

// async function connectDB() {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB connected");
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err.message);
//     process.exit(1);
//   }
// }

// export default connectDB;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js"; // ✅ import your connection helper
import authRoutes from "./Routes/auth.js";
import favoritesRoutes from "./Routes/favorites.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoritesRoutes);

// Connect to MongoDB
connectDB();

// Basic route for testing
app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


