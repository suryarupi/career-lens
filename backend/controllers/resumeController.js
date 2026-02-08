const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini with the trimmed key to avoid "Invalid Key" errors
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY.trim());

exports.analyzeResume = async (req, res) => {
  try {
    // 1. Check if file exists (provided by Multer memoryStorage)
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a resume file." });
    }

    // 2. Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. Convert PDF buffer to Base64 for Gemini
    const resumeBase64 = {
      inlineData: {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    // 4. Create a precise prompt to get structured JSON
    const prompt = `
      You are an expert HR Recruiter. Analyze this resume and provide a response strictly in JSON format.
      The JSON should have exactly these keys:
      {
        "score": (a number from 0-100),
        "feedback": "a short professional summary of the resume",
        "missingSkills": ["skill1", "skill2", "etc"]
      }
      Focus on MERN stack, JavaScript, and modern engineering practices.
    `;

    // 5. Generate Content
    const result = await model.generateContent([prompt, resumeBase64]);
    const response = await result.response;
    const text = response.text();

    // 6. Clean the response (Gemini sometimes adds ```json ... ``` blocks)
    const cleanJson = text.replace(/```json|```/g, "").trim();
    const analysisData = JSON.parse(cleanJson);

    // 7. Send back to your React frontend
    res.status(200).json(analysisData);

  } catch (error) {
    console.error("AI Analysis Error:", error);
    res.status(500).json({ 
      error: "Failed to analyze resume", 
      details: error.message 
    });
  }
};