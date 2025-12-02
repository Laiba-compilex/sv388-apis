const nodemailer = require('nodemailer');
require('dotenv').config();

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true', 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Optional settings
    tls: {
      rejectUnauthorized: false, // For self-signed certificates
    },
    pool: true, // Use pooled connections
    maxConnections: 5,
    maxMessages: 100,
  });
};

module.exports = createTransporter;