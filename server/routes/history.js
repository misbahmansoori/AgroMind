const express = require("express");
const DiseaseHistory = require("../models/DiseaseHistory");

const router = express.Router();

// GET /api/history
router.get("/", async (req, res) => {
  try {
    const history = await DiseaseHistory.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    });
  }
});

module.exports = router;