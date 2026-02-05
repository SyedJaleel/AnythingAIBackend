const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  errorHandler
};
