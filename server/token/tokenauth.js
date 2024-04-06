const jwt = require('jsonwebtoken');


// Middleware to generate JWT token
function generateToken(user) {
  return jwt.sign({ email: user.email, userId: user._id , role: user.position }, 'secret', {
    expiresIn: '24h',
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

/*
function checkRole(req, res, next) {
  if (req.userData && req.userData.role === 'Accountant') {
    next(); // User is authorized, proceed to the next middleware
  } else {
    return res.status(403).json({ message: 'Forbidden' }); // User is not authorized
  }
} */

function checkRole(req, res, next) {
  const allowedRoles = ['Accountant', 'Manager']; // Define allowed roles
  if (req.userData && allowedRoles.includes(req.userData.role)) {
    next(); // User is authorized, proceed to the next middleware
  } else {
    return res.status(403).json({ message: 'Forbidden' }); // User is not authorized
  }
}

module.exports = { generateToken, verifyToken, checkRole };