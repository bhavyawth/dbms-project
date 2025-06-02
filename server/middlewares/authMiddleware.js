const { verifyToken } = require("../services/authService");

function protectedRoute() {
  return (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided. Unauthorized.' });
    }

    try {
      const user = verifyToken(token);
      req.user = user;
      return next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
  };
}

module.exports = {
  protectedRoute,
};
