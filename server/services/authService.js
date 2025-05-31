const JWT = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
    email: user.email,
    role: user.role,
  };
  return JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRATION || '1h' });
}
const verifyToken = (token) => {
  try {
    return JWT.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};