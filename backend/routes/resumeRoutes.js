const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/analyze', upload.single('resume'), async (req, res) => {
    try {
        const key = process.env.GEMINI_API_KEY?.trim();
        if (!key) return res.status(500).json({ error: "API Key missing" });
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const genAI = new GoogleGenerativeAI(key);
        // Using the latest stable model
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const resumeBase64 = {
            inlineData: {
                data: req.file.buffer.toString("base64"),
                mimeType: req.file.mimetype,
            },
        };

        // 🛠️ REFINED PROMPT: This ensures the frontend gets exactly what it needs for the charts
        const prompt = `Analyze this resume for a MERN stack developer role.
        Return ONLY a raw JSON object (no markdown, no backticks).
        Required format:
        {
          "score": 85,
          "matchPercentage": 88,
          "readiness": "High",
          "feedback": "Expert advice here...",
          "strengths": ["React", "Node.js", "MongoDB"],
          "missingSkills": ["Docker", "Redis"],
          "suggestions": ["Add cloud projects", "Optimize SEO"],
          "skills": {
            "labels": ["Frontend", "Backend", "Database", "Cloud", "DevOps", "Testing"],
            "values": [90, 80, 70, 40, 30, 50]
          }
        }`;

        const result = await model.generateContent([prompt, resumeBase64]);
        const text = result.response.text();

        // 🛡️ SANITIZATION: Removes Markdown code blocks if the AI accidentally adds them
        const cleanText = text.replace(/```json|```/g, "").trim();

        // 🛡️ EXTRACTION: Finds the first { and last } to avoid trailing text errors
        const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
        
        if (!jsonMatch) {
            throw new Error("AI response did not contain valid JSON block");
        }
        
        const finalData = JSON.parse(jsonMatch[0]);
        res.status(200).json(finalData);

    } catch (error) {
        console.error("❌ BACKEND ERROR:", error.message);
        
        // Prevent the 606 error from crashing the frontend
        if (error instanceof SyntaxError) {
            return res.status(500).json({ error: "AI returned malformed data. Please try again." });
        }

        res.status(500).json({ error: "AI Analysis failed", details: error.message });
    }
});

module.exports = router;