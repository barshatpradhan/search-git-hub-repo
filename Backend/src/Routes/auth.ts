import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../Models/User';

const router = express.Router();

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
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.error('User already exists:', { email, username });
      return res.status(400).json({ 
        error: 'User with this email or username already exists' 
      });
    }

    const user = new User({ username, email, password });
    await user.save();
    console.log('User created successfully:', user._id);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username, 
        email 
      } 
    });
  } catch (error: any) {
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

    const user = await User.findOne({ email });
    
    if (!user) {
      console.error('User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      console.error('Invalid password for user:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
    console.log('Login successful:', user._id);

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        email 
      } 
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(400).json({ 
      error: error.message || 'Login failed',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

export default router;