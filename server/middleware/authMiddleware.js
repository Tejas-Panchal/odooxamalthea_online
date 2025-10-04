const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  // Check if the token is sent in the headers and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token's payload (id) and attach it to the request object
      // Exclude the password from the user object
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ msg: 'Not authorized, user not found' });
      }

      next(); // Proceed to the next middleware or the controller
    } catch (error) {
      console.error(error);
      return res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: 'Not authorized, no token' });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // We assume 'protect' middleware has run, so req.user is available
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        msg: `User role '${req.user.role}' is not authorized to access this route`,
      });
    }
    next();
  };
};