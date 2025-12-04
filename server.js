require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { swaggerUi, specs } = require('./swagger');

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
  // In production this must be set — fail fast.
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ Missing required environment variable: JWT_SECRET (production)');
    process.exit(1);
  }

  // For development convenience, generate a temporary secret and log a warning.
  const crypto = require('crypto');
  process.env.JWT_SECRET = crypto.randomBytes(32).toString('hex');
  console.warn('⚠️  JWT_SECRET not found — using a generated development-only secret. Add JWT_SECRET to your .env for persistent behavior.');
}

// Database connection
connectDB();

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Node.js + MongoDB API' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});