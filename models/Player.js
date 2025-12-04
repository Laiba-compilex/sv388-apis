const mongoose = require('mongoose');
const { token } = require('morgan');

const PlayerSchema = new mongoose.Schema({
  agentId: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true
  },
  realName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  sumOfAllBalances: {
    type: Number,
    default: 0
  },
  telesaleName: {
    type: String
  },
  tags: {
    type: [String],
    default: []
  },
  allowDeposit: {
    type: Boolean,
    default: true
  },
  allowWithdraw: {
    type: Boolean,
    default: true
  },
  allowLogin: {
    type: Boolean,
    default: true
  },
  signUpDate: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Player', PlayerSchema);