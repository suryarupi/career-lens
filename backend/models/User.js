const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In a real app, we hash this!
  skills: [
    {
      name: String,
      level: Number, // 0 to 100
      category: String // e.g., 'Frontend', 'Backend'
    }
  ],
  resumeScore: { type: Number, default: 0 },
  resumeAnalysis: { type: String }, // Stores AI feedback text
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);