const Opportunity = require('../models/Opportunity');
const User = require('../models/User');

exports.getRecommendedOpportunities = async (req, res) => {
  try {
    // 1. Get the current user's skills (In a real app, get ID from Auth token)
    const user = await User.findById(req.query.userId); 
    if (!user) return res.status(404).json({ message: "User not found" });

    const userSkillNames = user.skills.map(s => s.name.toLowerCase());

    // 2. Fetch all opportunities
    const jobs = await Opportunity.find();

    // 3. Calculate match for each job
    const recommended = jobs.map(job => {
      const required = job.requiredSkills.map(s => s.toLowerCase());
      
      // Find intersection (common skills)
      const commonSkills = required.filter(skill => userSkillNames.includes(skill));
      
      // Calculate percentage
      const matchPercentage = Math.round((commonSkills.length / required.length) * 100);

      return {
        ...job._doc,
        matchScore: matchPercentage,
        missingSkills: required.filter(skill => !userSkillNames.includes(skill))
      };
    });

    // 4. Sort by highest match first
    recommended.sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json(recommended);
  } catch (error) {
    res.status(500).json({ message: "Error fetching matches" });
  }
};