const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load .env BEFORE any routes/services that need secrets
dotenv.config();

const connectDB = require("./config/db");
const detectRoutes = require("./routes/detect");

const authRoutes=require("./routes/auth.routes");

const historyRoutes = require("./routes/history");


const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🌱 AgroMind API is Running...");
});

app.use("/api/detect", detectRoutes);

app.use("/api/auth",authRoutes);
=======
app.use("/api/history", historyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(
    `🔑 Gemini key loaded: ${process.env.GEMINI_API_KEY ? "yes" : "NO — check server/.env"}`
  );
});
