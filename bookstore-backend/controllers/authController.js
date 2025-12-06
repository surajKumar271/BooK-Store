const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    let { name, email, username, password } = req.body;

    // Validate required fields
    if (!email || !password || !username) {
      return res.status(400).json({ msg: 'Required fields missing' });
    }

    // Normalize inputs
    email = email.trim().toLowerCase();
    username = username.trim().toLowerCase();
    name = name?.trim() || '';

    // Check if email or username already exists
    const existingEmail = await User.findByEmailOrUsername(email);
    if (existingEmail) return res.status(400).json({ msg: 'Email already in use' });

    const existingUsername = await User.findByEmailOrUsername(username);
    if (existingUsername) return res.status(400).json({ msg: 'Username already in use' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Create user
    await User.create({ name, email, username, password: hashed });

    res.json({ msg: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    let { identifier, password } = req.body;

    // Validate required fields
    if (!identifier || !password) {
      return res.status(400).json({ msg: 'Required fields missing' });
    }

    // Normalize identifier
    identifier = identifier.trim().toLowerCase();

    // Find user by email or username
    const user = await User.findByEmailOrUsername(identifier);
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      msg: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, username: user.username }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
