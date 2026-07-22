import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    diseaseHistoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DiseaseHistory",
      required: true,
    },

    reportUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Report", reportSchema);