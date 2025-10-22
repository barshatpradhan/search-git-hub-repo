import express from "express";
import connectDB from "./db.js"; // <-- note the `.js` extension is required with ES modules

const app = express();
connectDB();

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
