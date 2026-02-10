require('dotenv').config(); // MUST be the very first line
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const resumeRoutes = require('./routes/resumeRoutes');

// --- 🛠️ API KEY SANITIZATION ---
// This prevents the common "Invalid Key" or "404" errors caused by whitespace
if (process.env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = process.env.GEMINI_API_KEY.trim();
}

const app = express();

// --- 🌐 MIDDLEWARE ---
app.use(cors({
    origin: "http://localhost:3000", // Your React Frontend
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json()); // Essential for parsing JSON requests

// --- 🗄️ DATABASE CONNECTION ---
connectDB();

// --- 🚀 ROUTES ---
// All resume-related requests will start with /api/resume
app.use('/api/resume', resumeRoutes);

app.get('/api/opportunities', (req, res) => {
  const mockJobs = [
    {
      _id: "1",
      title: "MERN Stack Developer",
      company: "Innovate AI",
      location: "Remote",
      type: "Full-time",
      matchScore: 92,
      requiredSkills: ["MongoDB", "Express", "React", "Node.js"],
      link: "https://example.com/apply/1",
      date: "Posted 2h ago"
    },
    {
      _id: "2",
      title: "Frontend Engineer",
      company: "Pixel Perfect",
      location: "Bengaluru, IN",
      type: "Internship",
      matchScore: 85,
      requiredSkills: ["React", "Tailwind CSS", "JavaScript"],
      link: "https://example.com/apply/2",
      date: "Posted 5h ago"
    }
  ];
  res.json(mockJobs);
});

// --- 🏥 HEALTH CHECK ---
// Useful for verifying the server is actually up in your browser
app.get('/', (req, res) => {
    res.send('<h1>Career Lens Backend is Running! 🚀</h1>');
});

// --- 📡 SERVER INITIALIZATION ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("---------------------------------");
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔗 Health Check: http://localhost:${PORT}/`);
    
    if (process.env.GEMINI_API_KEY) {
        console.log("✅ GEMINI_API_KEY detected and cleaned.");
    } else {
        console.log("❌ CRITICAL: GEMINI_API_KEY missing in .env!");
    }
    console.log("---------------------------------");
});