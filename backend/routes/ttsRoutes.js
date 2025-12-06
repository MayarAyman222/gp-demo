// routes/ttsRoutes.js
import express from "express";
import { speakText } from "../controllers/ttsController.js";

const router = express.Router();

router.post("/speak", speakText);

export default router;
