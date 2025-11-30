/*import gTTS from "google-tts-api";
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
};*/


// controllers/ttsController.js
/*import { exec } from "child_process";
import fs from "fs-extra";
import path from "path";
import pkg from "uuid";
const { v4: uuidv4 } = pkg;

export const speakText = async (req, res) => {
  const { text, lang, gender, tone } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  // تحديد موديل حسب اللغة والجندر
  let model = "";
  switch (lang) {
    case "en":
      model =
        gender === "female"
          ? "tts_models/en/vctk/vits"
          : "tts_models/en/ljspeech/tacotron2-DDC";
      break;
    case "ar":
      model = "tts_models/ar/kaedim/vits";
      break;
    case "fr":
      model =
        gender === "female"
          ? "tts_models/fr/css10/vits"
          : "tts_models/fr/mai/tacotron2";
      break;
    default:
      model = "tts_models/en/ljspeech/tacotron2-DDC";
  }

  // ضبط سرعة النبرة (tone)
  const speed = tone === "calm" ? 0.9 : 1.2;

  // اسم ملف مؤقت لكل طلب
  const outputFileName = `${uuidv4()}.wav`;
  const outputPath = path.join("temp_audio", outputFileName);

  // إنشاء مجلد مؤقت لو مش موجود
  await fs.ensureDir("temp_audio");

  // أمر TTS
  const command = `tts --text "${text}" --model_name "${model}" --speed ${speed} --out_path "${outputPath}"`;

  exec(command, async (error) => {
    if (error) {
      console.error("TTS Error:", error);
      return res.status(500).json({ message: "Error generating speech" });
    }

    try {
      // قراءة الملف وإرساله كـ response
      const audio = await fs.readFile(outputPath);
      res.set({
        "Content-Type": "audio/wav",
        "Content-Length": audio.length,
      });
      res.send(audio);

      // حذف الملف المؤقت بعد الإرسال
      await fs.remove(outputPath);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error reading audio file" });
    }
  });
};*/
/*import { exec } from "child_process";
import fs from "fs-extra";
import path from "path";
import pkg from "uuid";
const { v4: uuidv4 } = pkg;

export const speakText = async (req, res) => {
  const { text, lang, gender, tone } = req.body;

  if (!text) return res.status(400).json({ message: "Text is required" });

  // تحديد موديل حسب اللغة والجندر
  let model = "";
  switch(lang) {
    case "en":
      model = gender === "female" ? "tts_models/en/vctk/vits" : "tts_models/en/ljspeech/tacotron2-DDC";
      break;
    case "ar":
      model = "tts_models/ar/kaedim/vits";
      break;
    case "fr":
      model = gender === "female" ? "tts_models/fr/css10/vits" : "tts_models/fr/mai/tacotron2";
      break;
    default:
      model = "tts_models/en/ljspeech/tacotron2-DDC";
  }

  // ضبط سرعة النبرة
  const speed = tone === "calm" ? 0.9 : 1.2;

  // اسم ملف مؤقت لكل طلب
  const outputFileName = `${uuidv4()}.wav`;
  const outputPath = path.join("temp_audio", outputFileName);

  await fs.ensureDir("temp_audio"); // إنشاء مجلد مؤقت لو مش موجود

  // full path to tts.exe
  const ttsPath = `"C:\\Users\\hp\\AppData\\Local\\Programs\\Python\\Python311\\Scripts\\tts.exe"`;
  const command = `${ttsPath} --text "${text}" --model_name "${model}" --out_path "${outputPath}"`;
 
  exec(command, async (error) => {
    if (error) {
      console.error("TTS Error:", error);
      return res.status(500).json({ message: "Error generating speech" });
    }

    try {
      const audio = await fs.readFile(outputPath);
      res.set({
        "Content-Type": "audio/wav",
        "Content-Length": audio.length,
      });
      res.send(audio);
      await fs.remove(outputPath); // حذف الملف المؤقت بعد الإرسال
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error reading audio file" });
    }
  });
};
*/
import { exec } from "child_process";
import fs from "fs-extra";
import path from "path";
import pkg from "uuid";
const { v4: uuidv4 } = pkg;

export const speakText = async (req, res) => {
  const { text, lang, gender, tone } = req.body;

  if (!text) return res.status(400).json({ message: "Text is required" });

  let model = "";
  switch (lang) {
    case "en":
      model = gender === "female" ? "tts_models/en/vctk/vits" : "tts_models/en/ljspeech/tacotron2-DDC";
      break;
    case "ar":
      model = "tts_models/ar/kaedim/vits";
      break;
    case "fr":
      model = gender === "female" ? "tts_models/fr/css10/vits" : "tts_models/fr/mai/tacotron2";
      break;
    default:
      model = "tts_models/en/ljspeech/tacotron2-DDC";
  }

  const outputFileName = `${uuidv4()}.wav`;
  const outputPath = path.join("temp_audio", outputFileName);

  try {
    await fs.ensureDir("temp_audio");
    const ttsPath = `"C:\\Users\\hp\\AppData\\Local\\Programs\\Python\\Python311\\Scripts\\tts.exe"`;

    const command = `${ttsPath} --text "${text}" --model_name "${model}" --out_path "${outputPath}"`;

    exec(command, async (error) => {
      if (error) {
        console.error("TTS Error:", error);
        return res.status(500).json({ message: "Error generating speech" });
      }

      try {
        const audio = await fs.readFile(outputPath);
        res.set({
          "Content-Type": "audio/wav",
          "Content-Length": audio.length,
        });
        res.send(audio);

        await fs.remove(outputPath);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error reading audio file" });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error preparing audio directory" });
  }
};
