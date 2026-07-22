const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      enum: ["Hindi", "English"],
      default: "Hindi",
    },

    state: {
      type: String,
      required: true,
    },

    district: {
      type: String,
      default: "",
    },

    village: {
      type: String,
      default: "",
    },

    farmName: {
      type: String,
      default: "",
    },

    cropName: {
      type: String,
      default: "",
    },

    farmArea: {
      type: Number, // in acres/hectares
      default: null,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("User", userSchema);