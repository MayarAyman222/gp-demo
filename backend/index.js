
import express from "express";
import cors from "cors";
import iconRoutes from "./routes/iconRoutes.js";
import ttsRoutes from "./routes/ttsRoutes.js"; 
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// ====== Routes ======
app.use("/api/icons", iconRoutes);
//app.use("/api/tts", ttsRoutes); 
app.use("/api", ttsRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

