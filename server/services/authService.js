const JWT = require('jsonwebtoken');
const secret = 'Bhavya@9090'; //secret key hai

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
    email: user.email,
    role: user.role,
  };
  return JWT.sign(payload, secret, { expiresIn: '1h' });
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