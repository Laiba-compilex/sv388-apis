// middleware/validation.js
const { body, param, query, validationResult } = require('express-validator');

// Generic validator middleware to return errors in a consistent shape
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// User Registration Validation Rules
const registerValidation = [
//   body('name')
//     .notEmpty().withMessage('Name is required')
//     .trim()
//     .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters')
//     .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces')
//     .escape(),
  
  body('email')
    .notEmpty().withMessage('Email is required')
    .trim()
    .normalizeEmail()
    .isEmail().withMessage('Please provide a valid email')
    .custom(async (email) => {
      // Optional: Check if email exists in database
      const User = require('../models/User');
      const user = await User.findOne({ email });
      if (user) {
        throw new Error('Email already in use');
      }
      return true;
    }),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number and special character'),
  
  body('confirmPassword')
    .notEmpty().withMessage('Please confirm your password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  
  body('phone')
    .optional()
    .trim()
    .isMobilePhone().withMessage('Please provide a valid phone number'),
  
  body('role')
    .optional()
    .isIn(['user', 'admin', 'moderator']).withMessage('Invalid role selected'),
  
  body('terms')
    .equals('true').withMessage('You must accept terms and conditions')
];

// User Login Validation Rules
const loginValidation = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .trim()
    .normalizeEmail()
    .isEmail().withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Forgot Password Validation
const forgotPasswordValidation = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .trim()
    .normalizeEmail()
    .isEmail().withMessage('Please provide a valid email')
];

// Reset Password Validation
const resetPasswordValidation = [
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number and special character'),
  
  body('confirmPassword')
    .notEmpty().withMessage('Please confirm your password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];

// Update Profile Validation
const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  
  body('phone')
    .optional()
    .trim()
    .isMobilePhone().withMessage('Please provide a valid phone number'),
  
  body('avatar')
    .optional()
    .isURL().withMessage('Please provide a valid URL for avatar')
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  updateProfileValidation
};