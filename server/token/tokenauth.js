const jwt = require('jsonwebtoken');

// Middleware to generate JWT token
function generateToken(user) {
  return jwt.sign({ email: user.email, userId: user._id }, 'secret', {
    expiresIn: '1h',
  });
}

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the "Authorization" header
    const decoded = jwt.verify(token, 'secret');
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
}

module.exports = { generateToken, verifyToken };