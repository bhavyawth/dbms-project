const User = require('../models/user');
const { generateToken } = require('../services/authService');

const handleUserLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Incorrect Username or Password❕' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect Password❕' });
    }

    req.user = user;
    res.cookie('token', generateToken(user));

    return res.status(200).json({ //response for successful login
    success: true,
    message: 'Login successful',
    user: {
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const handleUserSignup = async (req, res) => {
  const { username, password, email, phone, role } = req.body;

  try {
    const user = await User.create({
      username,
      password,
      email,
      phone,
      role,
    });

    return res.status(200).json({
    success: true,
    message: 'Login successful',
    user: {
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const handleUserLogout = (req, res) => {
  res.clearCookie('token');
  req.user = null;
  return res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
};

const checkAuth = (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized access!" 
      });
    }

    return res.status(200).json({ 
      success: true,
      message: "User authenticated",
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    console.error("Error in checkAuth controller:", error.message);
    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};


module.exports = {
  handleUserLogin,
  handleUserSignup,
  handleUserLogout,
  checkAuth,
};
