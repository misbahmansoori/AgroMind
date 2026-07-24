const { GoogleGenAI } = require("@google/genai");

const askAssistant = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
You are AgroMind AI, an expert agricultural assistant.

Rules:
1. Answer ONLY agriculture and farming related questions.
2. Support both English and Hindi.
3. Keep answers simple and practical.
4. Prefer organic solutions first.
5. Suggest chemical treatments only if necessary.
6. Format your response clearly using headings and bullet points when appropriate.
7. If someone asks a non-agriculture question, politely reply:
"I can only help with farming and agriculture related questions."

Farmer's Question:
${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite", // same family that worked for detect
      contents: [{ text: prompt }],
    });

    return res.status(200).json({
      success: true,
      reply: response.text,
    });
  } catch (error) {
    console.error("Assistant Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
      error: error.message,
    });
  }
};

module.exports = { askAssistant };