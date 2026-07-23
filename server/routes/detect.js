const express = require("express");
const multer = require("multer");
const { analyzeCropImage } = require("../services/gemini");

const DiseaseHistory = require("../models/DiseaseHistory");
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

function resolveMimeType(file) {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) return file.mimetype;

  const ext = file.originalname.split(".").pop().toLowerCase();
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  return "image/jpeg";
}

// POST /api/detect  (form-data field: image)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a crop image",
      });
    }

    const mimeType = resolveMimeType(req.file);
    const base64Image = req.file.buffer.toString("base64");

    console.log("Detect upload:", {
      name: req.file.originalname,
      mimeType,
      sizeKB: Math.round(req.file.size / 1024),
    });

    const diagnosis = await analyzeCropImage(base64Image, mimeType);

    // Save diagnosis to MongoDB
    await DiseaseHistory.create({
      cropName: diagnosis.cropName,
      diseaseName: diagnosis.diseaseName,
      confidence: diagnosis.confidence,
      severity: diagnosis.severity,
      symptoms: diagnosis.symptoms,
      explanation: diagnosis.explanation,
      organicTreatment: diagnosis.organicTreatment,
      chemicalTreatment: diagnosis.chemicalTreatment,
      prevention: diagnosis.prevention,
      recoveryTime: diagnosis.recoveryTime,
      estimatedCost: diagnosis.estimatedCost,

      // No image storage yet
      imageUrl: "",

      // Will be filled after authentication
      user: undefined,
    });

    return res.status(200).json({
      success: true,
      demo: Boolean(diagnosis._demo),
      data: diagnosis,
    });
  } catch (error) {
    console.error("Detect error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to analyze crop image",
      error: error.message,
    });
  }
});

module.exports = router;
