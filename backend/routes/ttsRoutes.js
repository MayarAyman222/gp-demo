import express from "express";
import { speakText } from "../controllers/ttsController.js";

const router = express.Router();

router.post("/", speakText);

export default router;
