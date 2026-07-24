require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const MODEL_CANDIDATES = [
  "gemini-3.5-flash-lite",
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-flash-latest",
];

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing in server/.env");
  }
  return new GoogleGenAI({ apiKey });
}

function parseJson(text) {
  const cleaned = String(text || "")
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
  return JSON.parse(cleaned);
}

/**
 * Translate diagnosis / farm text fields to Hindi for UI display.
 * Keeps severity codes (High/Medium/Low) in English for logic.
 */
async function translateFieldsToHindi(fields = {}) {
  const ai = getClient();

  const prompt = `
You are a translator for AgroMind, an Indian farming app.
Translate the JSON field values into simple, clear Hindi (Devanagari).
Keep farming meaning accurate. Keep numbers, %, ₹, and crop science names understandable.
Do NOT translate these keys' CODE values if they are exactly High, Medium, or Low — leave severity as High/Medium/Low.
Return ONLY valid JSON with the SAME keys.

Input JSON:
${JSON.stringify(fields)}
`;

  const errors = [];

  for (const model of MODEL_CANDIDATES) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: [{ text: prompt }],
      });

      const text =
        response?.text ||
        response?.candidates?.[0]?.content?.parts
          ?.map((p) => p.text)
          .join("") ||
        "";

      const translated = parseJson(text);
      return { success: true, translated, model };
    } catch (err) {
      errors.push(`${model}: ${err.message}`);
    }
  }

  // Fallback: return original English if Gemini fails
  return {
    success: false,
    translated: fields,
    error: errors.join(" | "),
  };
}

module.exports = { translateFieldsToHindi };
