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
        
        // 🛠️ USE THE 2026 STABLE LITE MODEL
        // This bypasses the 404 error you saw with 1.5-flash-8b
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const resumeBase64 = {
            inlineData: {
                data: req.file.buffer.toString("base64"),
                mimeType: req.file.mimetype,
            },
        };

        const prompt = `Analyze this resume for a MERN stack role. 
        Return ONLY a JSON object: { "score": 0-100, "feedback": "advice", "missingSkills": [] }`;

        const result = await model.generateContent([prompt, resumeBase64]);
        const text = result.response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("AI response was not valid JSON");
        
        res.status(200).json(JSON.parse(jsonMatch[0]));

    } catch (error) {
        console.error("❌ BACKEND ERROR:", error.message);
        
        // Friendly error for the frontend
        if (error.message.includes("429")) {
            return res.status(429).json({ error: "AI is busy. Please wait 30 seconds." });
        }
        res.status(500).json({ error: "AI Analysis failed", details: error.message });
    }
});

module.exports = router;