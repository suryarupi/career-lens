const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

// Define the Schema directly in the seed script to avoid import path issues
const OpportunitySchema = new mongoose.Schema({
  title: String,
  company: String,
  type: String,
  requiredSkills: [String],
  location: String,
  link: String,
});

// Use existing model if it exists, or create a new one
const Opportunity = mongoose.models.Opportunity || mongoose.model('Opportunity', OpportunitySchema);

const seedDB = async () => {
  try {
    console.log("⏳ Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connection established.");

    console.log("🧹 Clearing old data...");
    // We use .exec() to ensure the promise is handled correctly
    await Opportunity.deleteMany({}).exec(); 
    console.log("✨ Database cleared.");

    const sampleJobs = [
      {
        title: "Full Stack Developer Intern",
        company: "Google",
        type: "Internship",
        requiredSkills: ["React", "Node.js", "MongoDB"],
        location: "Bangalore",
        link: "https://google.com/careers"
      },
      {
        title: "Smart India Hackathon 2026",
        company: "Ministry of Education",
        type: "Hackathon",
        requiredSkills: ["Problem Solving", "Prototyping"],
        location: "National",
        link: "https://sih.gov.in"
      }
    ];

    await Opportunity.insertMany(sampleJobs);
    console.log("🚀 Database Seeded Successfully!");

  } catch (error) {
    console.error("❌ Seeding Error:", error);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
};

seedDB();