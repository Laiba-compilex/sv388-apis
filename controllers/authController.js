const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/emailConfig');
const authController = {
  register: async (req, res) => {
    try {
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
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }
      
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ success: false, error: 'JWT secret is not configured on the server' });
      }

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
      const user = await User.findById(req.query.id).select('-password');
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
  },

  updateUser: async (req, res) => {
    try {
      console.log("Update User Called", req.body);
      const user = await User.findById(req.body.id);
      const updatedUser = Object.assign(user, req.body);
      await updatedUser.save();
      res.json({
        success: true,
        data: updatedUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
},

resetPassword: async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.json({
        success: true,
        message: 'Password reset successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    } 
  },
forgotPassword: async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <p>Hi ${user.name},</p>
        <p>You requested to reset your password.</p>
        <p>
          Click <a href="${resetUrl}">here</a> to reset your password.
        </p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    res.json({
      success: true,
      message: "Password reset link sent to your email",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
},

};




module.exports = authController;