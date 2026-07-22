const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    // Who owns this PDF report
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Which scan / diagnosis this PDF was generated from
    diseaseHistory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DiseaseHistory",
      required: true,
    },

    // PDF file path or cloud URL
    reportUrl: {
      type: String,
      required: true,
      trim: true,
    },

    // Optional labels for quick listing without populate
    title: {
      type: String,
      trim: true,
      default: "Crop Doctor Report",
    },

    cropName: {
      type: String,
      trim: true,
    },

    diseaseName: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportSchema);
