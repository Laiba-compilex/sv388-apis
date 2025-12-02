const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidation, loginValidation, validate } = require('../middleware/validation');

// Public routes
router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);
router.post('/updateUser', authController.updateUser);
router.post('/forgotPassword', authController.forgotPassword);

// Protected route (requires authentication)
router.get('/me', authController.getMe);

module.exports = router;