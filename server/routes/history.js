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

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await DiseaseHistory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "History not found",
      });
    }

    res.json({
      success: true,
      message: "History deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete history",
    });
  }
});
module.exports = router;
