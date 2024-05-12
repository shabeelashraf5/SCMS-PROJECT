const jwt = require('jsonwebtoken');


// Middleware to generate JWT token
/*
function  generateToken(user) {
  return jwt.sign({ email: user.email, userId: user._id , role: user.position }, 'secret', {
    expiresIn: '24h',
  });
} */

function generateToken(user) {
  const token = jwt.sign({ email: user.email, userId: user._id, role: user.position }, 'secret', { expiresIn: '24h' });
  const refreshToken = jwt.sign({ userId: user._id }, 'refreshSecret', { expiresIn: '15m' });
  return { token, refreshToken };
}


// Middleware to verify JWT token
/*
function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }// Assuming token is sent in the "Authorization" header
    const decoded = jwt.verify(token, 'secret');
    req.userData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
}*/

function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1]; // Extracting token from the Authorization header
      const decoded = jwt.verify(token, 'secret');
      req.userData = decoded;
      next();
    } else {
      throw new Error('Authorization header not found');
    }
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

module.exports = { generateToken, verifyToken, checkRole  };