"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../Models/User"));
const router = express_1.default.Router();
router.post('/register', async (req, res) => {
    try {
        console.log('Registration attempt:', {
            body: req.body,
            hasUsername: !!req.body.username,
            hasEmail: !!req.body.email,
            hasPassword: !!req.body.password
        });
        const { username, email, password } = req.body;
        // Validate required fields
        if (!username || !email || !password) {
            console.error('Missing required fields');
            return res.status(400).json({
                error: 'Username, email, and password are required',
                received: { username: !!username, email: !!email, password: !!password }
            });
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }
        // Check if user already exists
        const existingUser = await User_1.default.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            console.error('User already exists:', { email, username });
            return res.status(400).json({
                error: 'User with this email or username already exists'
            });
        }
        const user = new User_1.default({ username, email, password });
        await user.save();
        console.log('User created successfully:', user._id);
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                username,
                email
            }
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({
            error: error.message || 'Registration failed',
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});
router.post('/login', async (req, res) => {
    try {
        console.log('Login attempt:', {
            body: req.body,
            hasEmail: !!req.body.email,
            hasPassword: !!req.body.password
        });
        const { email, password } = req.body;
        // Validate required fields
        if (!email || !password) {
            console.error('Missing credentials');
            return res.status(400).json({
                error: 'Email and password are required',
                received: { email: !!email, password: !!password }
            });
        }
        const user = await User_1.default.findOne({ email });
        if (!user) {
            console.error('User not found:', email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            console.error('Invalid password for user:', email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET);
        console.log('Login successful:', user._id);
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(400).json({
            error: error.message || 'Login failed',
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map