const { Router } = require('express');
const { 
  handleUserLogin, 
  handleUserSignup, 
  handleUserLogout, 
  checkAuth 
} = require('../controllers/authController');

const { protectedRoute } = require('../middlewares/authMiddleware');

const router = Router();

router.post('/login', handleUserLogin);

router.post('/signup', handleUserSignup);

router.get('/check', protectedRoute('token'), checkAuth); 

router.post('/logout', handleUserLogout);

module.exports = router;
