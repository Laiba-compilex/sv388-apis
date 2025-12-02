require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/Database');
const authRoutes = require('./routes/authRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fail-fast checks for required env vars
if (!process.env.MONGODB_URI) {
  console.error('❌ Missing required environment variable: MONGODB_URI');
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error('❌ Missing required environment variable: JWT_SECRET');
  console.error('Tip: add JWT_SECRET to your .env file (example: JWT_SECRET=your_secret_here)');
  process.exit(1);
}

// Database connection
connectDB();
app.use('/api/users', authRoutes);
// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Node.js + MongoDB API' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});