const jwt = require('jsonwebtoken');




function generateToken(user) {
  const token = jwt.sign({ email: user.email, userId: user._id, role: user.position }, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_EXPIRES });
  const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_KEY, { expiresIn: process.env.REFRESH_EXPIRES });
  return { token, refreshToken };
}


function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1]; 
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



function checkRole(req, res, next) {
  const allowedRoles = ['Accountant', 'Manager']; 
  if (req.userData && allowedRoles.includes(req.userData.role)) {
    next(); 
  } else {
    return res.status(403).json({ message: 'Forbidden' }); 
  }
}

module.exports = { generateToken, verifyToken, checkRole  };