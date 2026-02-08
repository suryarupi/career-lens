const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  type: { type: String, enum: ['Internship', 'Hackathon', 'Project', 'Certification'] },
  requiredSkills: [String], // e.g., ['React', 'Node.js']
  description: { type: String },
  link: { type: String },
  postedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Opportunity', OpportunitySchema);