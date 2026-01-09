// controllers/translateController.js
import translate from "@iamtraction/google-translate";

export const translateText = async (req, res) => {
  try {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
      return res.status(400).json({ ok: false, message: "Missing text or targetLang" });
    }

    const result = await translate(text, { to: targetLang });

    return res.json({
      ok: true,
      translatedText: result.text,
      detectedLang: result.from.language.iso,
      targetLang: targetLang
    });

  } catch (err) {
    console.error("Translate error:", err);
    return res.status(500).json({ ok: false, message: err.message });
  }
};