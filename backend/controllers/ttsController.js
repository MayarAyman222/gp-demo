// controllers/ttsController.js
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import gTTS from "google-tts-api";
import pkg from "uuid";
const { v4: uuidv4 } = pkg;

const AUDIO_DIR = path.join(process.cwd(), "generated_audio");

export const speakText = async (req, res) => {
  try {
    const { text = "", language = "en", slow = false, filename: clientFilename } = req.body;

    if (!text.trim()) {
      return res.status(400).json({ ok: false, message: "text is required" });
    }

    const id = uuidv4();
    const outFilename = clientFilename
      ? path.join(AUDIO_DIR, clientFilename)
      : path.join(AUDIO_DIR, `speech-${id}.mp3`);

    const url = gTTS.getAudioUrl(text, { lang: language, slow });

    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(outFilename, buffer);

    const fileUrl = `${req.protocol}://${req.get("host")}/audio/${path.basename(outFilename)}`;

    return res.json({ ok: true, url: fileUrl, filename: path.basename(outFilename) });

  } catch (err) {
    console.error("TTS error:", err);
    return res.status(500).json({ ok: false, message: err.message });
  }
};