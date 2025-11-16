
/*import express from "express";
import gTTS from "google-tts-api";

export const speakText = async (req, res) => {
  const { text, lang } = req.body;

  if (!text) return res.status(400).json({ message: "Text is required" });

  try {
    const url = gTTS.getAudioUrl(text, {
      lang: lang || "en",
      slow: false,
      host: "https://translate.google.com",
    });

    // fetch the audio from Google
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": buffer.length,
      "Cache-Control": "no-cache",
    });

    res.send(buffer); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating audio", error: err.message });
  }
};*/
/*import gTTS from "google-tts-api";

export const speakText = async (req, res) => {
  const { text, lang } = req.body;

  if (!text) return res.status(400).json({ message: "Text is required" });

  try {
    // نجيب URL مباشر
    const url = gTTS.getAudioUrl(text, {
      lang: lang || "en",
      slow: false,
      host: "https://translate.google.com",
    });

    // نرجع URL بدل الصوت نفسه
    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating audio URL", error: err.message });
  }
};
*/
/*import express from "express";
import axios from "axios";

export const speakText = async (req, res) => {
  const { text, lang } = req.body;

  if (!text) return res.status(400).json({ message: "Text is required" });

  try {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=gtx`;
    
    // جلب الصوت من Google
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": buffer.length,
      "Cache-Control": "no-cache",
    });

    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating audio", error: err.message });
  }
};*/
import gTTS from "google-tts-api";
import fetch from "node-fetch";

export const speakText = async (req, res) => {
  const { text, lang } = req.body;

  if (!text) return res.status(400).json({ message: "Text is required" });

  try {
    const url = gTTS.getAudioUrl(text, {
      lang: lang || "en",
      slow: false,
      host: "https://translate.google.com",
    });

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": buffer.length,
      "Cache-Control": "no-cache",
    });

    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating audio", error: err.message });
  }
};













