const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load .env BEFORE any routes/services that need secrets
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

const connectDB = require("./config/db");
const detectRoutes = require("./routes/detect");
const authRoutes = require("./routes/auth.routes");
const historyRoutes = require("./routes/history");
const assistantRoutes = require("./routes/assistant");
const weatherRoutes = require("./routes/weather");
const translateRoutes = require("./routes/translate");

if (!process.env.JWT_SECRET) {
  console.error(
    "❌ JWT_SECRET is missing/empty in server/.env — login/register will fail",
  );
}

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🌱 AgroMind API is Running...");
});

app.use("/api/detect", detectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/assistant", assistantRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/translate", translateRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(
    `🔑 Gemini key loaded: ${process.env.GEMINI_API_KEY ? "yes" : "NO — check server/.env"}`,
  );
  console.log(
    `🔐 JWT secret loaded: ${process.env.JWT_SECRET ? "yes" : "NO — check server/.env"}`,
  );
});
