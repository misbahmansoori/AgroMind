const { GoogleGenAI } = require("@google/genai");

const askAssistant = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Keep only last 6 turns for follow-up context
    const recentHistory = Array.isArray(history) ? history.slice(-6) : [];
    const historyText = recentHistory
      .map((item) => {
        const role = item.sender === "user" ? "Farmer" : "AgroMind";
        return `${role}: ${item.text}`;
      })
      .join("\n");

    const prompt = `
You are AgroMind AI, a practical farming assistant for Indian farmers.

Language rules (strict):
- Reply in the SAME language as the farmer's latest question.
- If the question is in English → reply ONLY in English. Do NOT add Hindi translation.
- If the question is in Hindi → reply ONLY in Hindi. Do NOT add English translation.
- Never provide bilingual / dual-language answers.

Answer style (strict):
- Keep the reply SHORT: max 6–8 short lines or bullet points.
- Be direct and useful. No long essays.
- Prefer organic solutions first; mention chemical only if needed.
- Use previous chat context for follow-up questions.
- Answer ONLY agriculture/farming questions.
- If the question is not about farming, reply only:
"I can only help with farming and agriculture related questions."

${historyText ? `Previous conversation:\n${historyText}\n` : ""}
Farmer's latest question:
${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
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
