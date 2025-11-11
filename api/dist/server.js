"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./Routes/auth"));
const favorites_1 = __importDefault(require("./Routes/favorites"));
const serverless_http_1 = __importDefault(require("serverless-http"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middlewar
const allowedOrigins = [
    'http://localhost:5173',
    'https://search-git-hub-repo.vercel.app',
    'https://search-git-hub-repo-git-main-barshat-pradhans-projects.vercel.app',
    // 'https://search-git-hub-repo.onrender.com'
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
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
    console.log(`✅ Server running on port http://localhost:${PORT}`);
});
// Export as a Vercel serverless function
exports.handler = (0, serverless_http_1.default)(app);
//# sourceMappingURL=server.js.map