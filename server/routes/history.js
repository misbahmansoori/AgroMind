const express = require("express");
const DiseaseHistory = require("../models/DiseaseHistory");
const { protect } = require("../middleware/auth");

const router = express.Router();

// All history routes require a logged-in user
router.use(protect);

// GET /api/history — only this user's scans
router.get("/", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 100);

    const history = await DiseaseHistory.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(limit);

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

// DELETE /api/history/:id — only own scans
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await DiseaseHistory.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

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
