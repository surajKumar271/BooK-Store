const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: 'No token' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ msg: 'User not found' });

    req.user = user; // attach user (without password)
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: 'Token invalid' });
  }
};

module.exports = auth;
