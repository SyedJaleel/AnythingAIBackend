const User = require('../models/User');
const { hashPassword, comparePassword, generateToken } = require('../utils/helpers');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const userId = await User.create(email, hashedPassword, 'user');

    // Generate token
    const token = generateToken(userId, 'user');

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: userId, email }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user.id, user.role);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ message: 'Failed to fetch user', error: err.message });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser
};
