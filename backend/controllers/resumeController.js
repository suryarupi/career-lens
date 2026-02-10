const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY.trim());

exports.analyzeResume = async (req, res) => {
  // 🛠️ DEV TOGGLE: Set to true to bypass AI and save your quota during UI building
  const MOCK_FOR_TESTING = false; 

  if (MOCK_FOR_TESTING) {
    return res.status(200).json({
      score: 85,
      feedback: "MOCK: Great resume with strong MERN skills.",
      missingSkills: ["Docker", "Kubernetes"],
      strengths: ["React", "Node.js", "Express"],
      skills: { labels: ["Frontend", "Backend", "Cloud"], values: [90, 80, 40] }
    });
  }

  try {
    if (!req.file) return res.status(400).json({ error: "Please upload a resume file." });

    // Use 1.5-flash which has more stable free quotas
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const resumeBase64 = {
      inlineData: {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    const prompt = `
      Analyze this resume for a MERN stack role. 
      Return ONLY a JSON object with these keys:
      { "score": number, "feedback": "string", "missingSkills": [], "strengths": [], "skills": { "labels": [], "values": [] } }
    `;

    const result = await model.generateContent([prompt, resumeBase64]);
    const text = result.response.text();

    // Cleaning and Parsing
    const cleanJson = text.replace(/```json|```/g, "").trim();
    res.status(200).json(JSON.parse(cleanJson));

  } catch (error) {
    console.error("AI Analysis Error:", error.message);

    // 🛑 HANDLE 429 QUOTA ERROR GRACEFULLY
    if (error.message.includes("429")) {
      return res.status(429).json({ 
        error: "AI is overwhelmed.", 
        details: "Please wait 60 seconds. Our free-tier AI is cooling down." 
      });
    }

    res.status(500).json({ error: "Analysis failed", details: error.message });
  }
};