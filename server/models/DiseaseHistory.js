const mongoose = require("mongoose");

const diseaseHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cropName: {
      type: String,
      required: true,
      trim: true,
    },

    diseaseName: {
      type: String,
      required: true,
      trim: true,
    },

    confidence: {
      type: Number,
      min: 0,
      max: 100,
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    symptoms: [
      {
        type: String,
        trim: true,
      },
    ],

    // Explainable AI — why this diagnosis was made
    explanation: {
      type: String,
      trim: true,
    },

    organicTreatment: {
      type: String,
      trim: true,
    },

    chemicalTreatment: {
      type: String,
      trim: true,
    },

    prevention: {
      type: String,
      trim: true,
    },

    recoveryTime: {
      type: String,
      trim: true,
    },

    estimatedCost: {
      type: String,
      trim: true,
    },

    weather: {
      temp: Number,
      humidity: Number,
      rainfall: Number,
      condition: String,
    },

    status: {
      type: String,
      enum: ["Ongoing", "Recovered"],
      default: "Ongoing",
    },

    notes: {
      type: String,
      trim: true,
    },

    detectedOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DiseaseHistory", diseaseHistorySchema);
