const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================
// Hash password before saving
// ==========================
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ==========================
// Compare Password
// ==========================
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);