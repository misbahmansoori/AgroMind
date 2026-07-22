import mongoose from "mongoose";

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

    symptoms: [
      {
        type: String,
        trim: true,
      },
    ],

    detectedOn: {
      type: Date,
      default: Date.now,
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },

    treatment: {
      type: String,
      trim: true,
    },

    medicineUsed: {
      type: String,
      trim: true,
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

    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DiseaseHistory", diseaseHistorySchema);