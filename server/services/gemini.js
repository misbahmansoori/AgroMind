require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

// Models available on your key — try lighter ones first (better free-tier odds)
const MODEL_CANDIDATES = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.6-flash",
  "gemini-flash-latest",
];

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing in server/.env");
  }
  return new GoogleGenAI({ apiKey });
}

function buildPrompt() {
  return `
You are AgroMind, an AI crop doctor for Indian farmers.
Look at this crop leaf/plant image and return ONLY valid JSON (no markdown).

Use this exact shape:
{
  "cropName": "string",
  "diseaseName": "string (or Healthy)",
  "confidence": number (0-100),
  "severity": "Low" | "Medium" | "High",
  "symptoms": ["string", "string"],
  "explanation": "short explainable-AI reason",
  "organicTreatment": "string",
  "chemicalTreatment": "string",
  "prevention": "string",
  "recoveryTime": "string",
  "estimatedCost": "string in INR"
}

If healthy: diseaseName "Healthy", severity "Low", give light prevention tips.
`;
}

function parseDiagnosis(text) {
  const cleaned = String(text || "")
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

function getDemoDiagnosis(reason) {
  return {
    cropName: "Tomato",
    diseaseName: "Early Blight",
    confidence: 87,
    severity: "Medium",
    symptoms: [
      "Brown concentric spots on older leaves",
      "Yellowing around lesions",
      "Fungal ring pattern",
    ],
    explanation:
      "Leaf shows concentric brown spots with yellow margins — classic early blight pattern. (Demo fallback used because Gemini quota failed.)",
    organicTreatment:
      "Spray neem oil every 5–7 days. Remove and destroy infected leaves.",
    chemicalTreatment:
      "Use Mancozeb or Chlorothalonil as per local agri guidelines.",
    prevention:
      "Avoid overhead watering. Improve airflow between plants. Rotate crops.",
    recoveryTime: "7–14 days with consistent treatment",
    estimatedCost: "₹80–150 per spray cycle",
    _demo: true,
    _demoReason: reason,
  };
}

function isQuotaError(error) {
  const msg = String(error?.message || error || "");
  return (
    msg.includes("429") ||
    msg.includes("quota") ||
    msg.includes("RESOURCE_EXHAUSTED") ||
    msg.includes("Too Many Requests")
  );
}

/**
 * Analyze a crop leaf image with Gemini Vision.
 * Tries multiple models; if all fail due to quota, returns demo JSON
 * so the hackathon demo still works.
 */
async function analyzeCropImage(base64Image, mimeType = "image/jpeg") {
  const ai = getClient();
  const prompt = buildPrompt();
  const errors = [];

  for (const model of MODEL_CANDIDATES) {
    try {
      console.log(`🌿 Trying model: ${model}`);

      const response = await ai.models.generateContent({
        model,
        contents: [
          { text: prompt },
          {
            inlineData: {
              mimeType,
              data: base64Image,
            },
          },
        ],
      });

      const text = response.text;
      const diagnosis = parseDiagnosis(text);

      console.log(`✅ Success with model: ${model}`);
      return {
        ...diagnosis,
        _model: model,
        _demo: false,
      };
    } catch (error) {
      console.error(`❌ ${model} failed:`, error.message);
      errors.push(`${model}: ${error.message}`);

      // If not quota, still try next model; continue either way
      continue;
    }
  }

  const reason = errors[errors.length - 1] || "All Gemini models failed";
  console.warn("⚠️ Using demo diagnosis fallback:", reason);

  // Keep hackathon demo alive even when free tier is exhausted
  return getDemoDiagnosis(reason);
}

module.exports = { analyzeCropImage };
