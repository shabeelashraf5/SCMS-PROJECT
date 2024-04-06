function checkRole(req, res, next) {
    if (req.userData && req.userData.role === 'Accountant') {
      next(); // User is authorized, proceed to the next middleware
    } else {
      return res.status(403).json({ message: 'Forbidden' }); // User is not authorized
    }
  }