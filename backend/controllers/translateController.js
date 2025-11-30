/*import translate from "google-translate-api-x";

export const translateText = async (req, res) => {
  try {
    const { text, targetLang } = req.body;

    const result = await translate(text, { to: targetLang });

    res.json({
      translated: result.text,
    });
  } catch (err) {
    res.status(500).json({ message: "Translation error", error: err });
  }
};*/
import translate from "@iamtraction/google-translate";

export const translateText = async (req, res) => {
  try {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
      return res.status(400).json({ message: "Missing text or targetLang" });
    }

    const result = await translate(text, { to: targetLang });

    res.json({
      translatedText: result.text,
      detectedLang: result.from.language.iso,
      targetLang: targetLang
    });

  } catch (error) {
    console.error("Translation Error:", error);
    res.status(500).json({
      message: "Translation failed",
      error: error.message,
    });
  }
};
