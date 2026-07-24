const { translateFieldsToHindi } = require("../services/translate");

const translateContent = async (req, res) => {
  try {
    const { fields, targetLang = "hi" } = req.body;

    if (!fields || typeof fields !== "object") {
      return res.status(400).json({
        success: false,
        message: "fields object is required",
      });
    }

    if (targetLang !== "hi") {
      return res.status(200).json({
        success: true,
        data: fields,
        skipped: true,
      });
    }

    // Only send string fields worth translating
    const payload = {};
    for (const [key, value] of Object.entries(fields)) {
      if (typeof value === "string" && value.trim()) {
        payload[key] = value;
      } else if (Array.isArray(value)) {
        payload[key] = value;
      }
    }

    if (Object.keys(payload).length === 0) {
      return res.status(200).json({
        success: true,
        data: fields,
      });
    }

    const result = await translateFieldsToHindi(payload);

    res.status(200).json({
      success: true,
      data: {
        ...fields,
        ...result.translated,
      },
      fallback: !result.success,
    });
  } catch (error) {
    console.error("Translate error:", error);
    res.status(500).json({
      success: false,
      message: "Translation failed",
      error: error.message,
    });
  }
};

module.exports = { translateContent };
