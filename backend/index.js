// index.js (Final merged version)
/*
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

// ===== ROUTES =====
import iconRoutes from "./routes/iconRoutes.js";
import ttsRoutes from "./routes/ttsRoutes.js";
import translateRoutes from "./routes/translateRoutes.js";

// ====== APP SETUP ======
const app = express();
const PORT = process.env.PORT || 5000;

// ====== MIDDLEWARES ======
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "1mb" }));

// ====== AUDIO DIRECTORY ======
const AUDIO_DIR = path.join(process.cwd(), "generated_audio");
if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR);
app.use("/audio", express.static(AUDIO_DIR));

// ====== ROUTES ======
app.use("/api/icons", iconRoutes);   // Icons route with category filtering
app.use("/api/tts", ttsRoutes);      // TTS route
app.use("/api", translateRoutes);    // Translate route

// ====== HEALTH CHECK ======
app.get("/", (req, res) => {
  res.send("API is running... | TTS backend alive. Use /translate then /speak 🗣️");
});

// ====== START SERVER ======
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});*/
// ===========================
// 📌 MAIN SERVER FILE (index.js)
// ===========================

/*import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

// ===== ROUTES =====
import iconRoutes from "./routes/iconRoutes.js";
import ttsRoutes from "./routes/ttsRoutes.js";
import translateRoutes from "./routes/translateRoutes.js";

// ===== APP SETUP =====
const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARES =====
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "1mb" }));

// ===== STATIC FOLDER FOR GENERATED AUDIO =====
const AUDIO_DIR = path.join(process.cwd(), "generated_audio");
if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR);

app.use("/audio", express.static(AUDIO_DIR)); // Serve audio files publicly

// ===== ROUTES MOUNTING =====
app.use("/api/icons", iconRoutes);     // Icons API
app.use("/api/tts", ttsRoutes);        // Text-to-Speech API
app.use("/api", translateRoutes);      // Translation API

// ===== HEALTH CHECK =====
app.get("/", (req, res) => {
  res.send("✅ API is running...\n📌 Use /api/translate then /api/tts/speak");
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
*/
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

// ===== ROUTES =====
import iconRoutes from "./routes/iconRoutes.js";
import ttsRoutes from "./routes/ttsRoutes.js";
import translateRoutes from "./routes/translateRoutes.js";

// ===== APP SETUP =====
const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARES =====
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "1mb" }));

// ===== STATIC FOLDER FOR GENERATED AUDIO =====
const AUDIO_DIR = path.join(process.cwd(), "generated_audio");
if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR);

app.use("/audio", express.static(AUDIO_DIR));

// ===== ROUTES MOUNTING =====
app.use("/api/icons", iconRoutes);     // Icons & SubIcons API
app.use("/api/tts", ttsRoutes);        // Text-to-Speech API
app.use("/api", translateRoutes);      // Translation API

// ===== HEALTH CHECK =====
app.get("/", (req, res) => {
  res.send("✅ API is running...\n📌 Use /api/translate then /api/tts/speak");
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
