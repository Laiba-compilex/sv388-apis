const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
  register: async (req, res) => {
    try {
        console.log("Register endpoint hit", req.body);
      const { name, email, password } = req.body;
      
      // Validation
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Please provide all fields'
        });
      }
      
      // Check if user exists
    //   const userExists = await User.findOne({ email });
    //   if (userExists) {
    //     return res.status(400).json({
    //       success: false,
    //       error: 'User already exists'
    //     });
    //   }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Create user
      const user = await User.create({
        name,
        email,
        password: hashedPassword
      });
      
      // Ensure JWT secret is available
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ success: false, error: 'JWT secret is not configured on the server' });
      }

      // Generate token
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );
      
      res.status(201).json({
        success: true,
        token,
        data: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },
  
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Check user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }
      
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }
      
      // Ensure JWT secret is available
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ success: false, error: 'JWT secret is not configured on the server' });
      }

      // Generate token
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );
      
      res.json({
        success: true,
        token,
        data: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },
  
  getMe: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
};

module.exports = authController;