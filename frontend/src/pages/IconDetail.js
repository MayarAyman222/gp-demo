/*import React, { useEffect, useState, useRef } from "react";
import { getIconById } from "../api/iconApi";
import { speakText } from "../api/tts-translate-api";
import { useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useLanguage } from "../context/LanguageContext";

const IconDetail = () => {
  const { id } = useParams();
  const { lang } = useLanguage();

  const [icon, setIcon] = useState(null);
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayExpression, setDisplayExpression] = useState("");

  // Audio
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [speaking, setSpeaking] = useState(false);

  // ================= FETCH ICON =================
  useEffect(() => {
    const fetchIcon = async () => {
      try {
        const data = await getIconById(id);
        setIcon(data.icon ? data.icon : data);
      } catch (err) {
        console.error("Error fetching icon:", err);
      }
    };
    fetchIcon();
  }, [id]);

  // ================= UPDATE TITLE & EXPRESSION BY LANG =================
  useEffect(() => {
    if (!icon) return;

    const titleMap = {
      en: icon.title_en,
      ar: icon.title_ar,
      fr: icon.title_fr,
      es: icon.title_es,
    };

    const expressionMap = {
      en: icon.expression_en,
      ar: icon.expression_ar,
      fr: icon.expression_fr,
      es: icon.expression_es,
    };

    setDisplayTitle(titleMap[lang] || icon.title_en || "");
    setDisplayExpression(expressionMap[lang] || icon.expression_en || "");
  }, [icon, lang]);

  // ================= SPEAK =================
  const handleSpeak = async () => {
    if (!displayExpression) return;

    try {
      setSpeaking(true);
      const result = await speakText(displayExpression, lang);
      if (!result.ok) throw new Error("TTS failed");

      if (audioRef.current) {
        audioRef.current.src = result.url;
        audioRef.current.volume = volume;
        audioRef.current.playbackRate = speed;
        await audioRef.current.play();
      }
    } catch (err) {
      console.error("Speak error:", err);
    } finally {
      setSpeaking(false);
    }
  };

  // ================= AUDIO SETTINGS =================
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = speed;
    }
  }, [volume, speed]);

  if (!icon) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "100vh", padding: "2rem" }}
    >
      <div
        className="card shadow-lg p-4 rounded-4 d-flex flex-row align-items-start"
        style={{ maxWidth: "900px", width: "100%", gap: "24px" }}
      >
        {/* LEFT ICON *}
        <div className="text-center" style={{ minWidth: 280 }}>
          {icon.imageUrl ? (
            <img
              src={icon.imageUrl}
              alt={displayTitle}
              className="img-fluid rounded-3 shadow-sm"
              style={{ width: 200, height: 220, objectFit: "cover" }}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/250")
              }
            />
          ) : (
            <i
              className={`fa-solid fa-${icon.iconName}`}
              style={{ fontSize: 250, color: "#333" }}
            />
          )}
        </div>

        {/* RIGHT CONTENT *}
        <div style={{ width: "100%" }}>
          <h2 className="fw-bold mb-2">{displayTitle}</h2>
          <p className="text-muted fs-5 mb-3">{displayExpression}</p>

          {/* SPEAK BUTTON *}
          <button
            className="btn btn-primary mb-3"
            onClick={handleSpeak}
            disabled={speaking || !displayExpression}
          >
            {speaking ? "Speaking..." : "🔊 Speak"}
          </button>

          {/* CONTROLS *}
          <div className="p-3 rounded-3 bg-dark text-white">
            {/* Volume *}
            <div className="d-flex align-items-center gap-3 mb-2">
              <label style={{ minWidth: 60 }}>Volume</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(+e.target.value)}
                style={{ flex: 1 }}
              />
              <span>{(volume * 100).toFixed(0)}%</span>
            </div>

            {/* Speed *}
            <div className="d-flex align-items-center gap-3">
              <label style={{ minWidth: 60 }}>Speed</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.05"
                value={speed}
                onChange={(e) => setSpeed(+e.target.value)}
                style={{ flex: 1 }}
              />
              <span>{speed.toFixed(2)}x</span>
            </div>
          </div>

          <audio ref={audioRef} hidden />
        </div>
      </div>
    </div>
  );
};

export default IconDetail;
*/
import React, { useEffect, useState, useRef, useContext } from "react";
import { getIconById } from "../api/iconApi";
import { speakText } from "../api/tts-translate-api";
import { useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AppContext } from "../context/AppContext"; // AppContext

const IconDetail = () => {
  const { id } = useParams();
  const { language: lang, theme } = useContext(AppContext);

  const [icon, setIcon] = useState(null);
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayExpression, setDisplayExpression] = useState("");

  // Audio
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [speaking, setSpeaking] = useState(false);

  // ================= FETCH ICON =================
  useEffect(() => {
    const fetchIcon = async () => {
      try {
        const data = await getIconById(id);
        setIcon(data.icon ? data.icon : data);
      } catch (err) {
        console.error("Error fetching icon:", err);
      }
    };
    fetchIcon();
  }, [id]);

  // ================= UPDATE TITLE & EXPRESSION BY LANG =================
  useEffect(() => {
    if (!icon) return;

    const titleMap = {
      en: icon.title_en,
      ar: icon.title_ar,
      fr: icon.title_fr,
      es: icon.title_es,
    };

    const expressionMap = {
      en: icon.expression_en,
      ar: icon.expression_ar,
      fr: icon.expression_fr,
      es: icon.expression_es,
    };

    setDisplayTitle(titleMap[lang] || icon.title_en || "");
    setDisplayExpression(expressionMap[lang] || icon.expression_en || "");
  }, [icon, lang]);

  // ================= SPEAK =================
  const handleSpeak = async () => {
    if (!displayExpression) return;

    try {
      setSpeaking(true);
      const result = await speakText(displayExpression, lang);
      if (!result.ok) throw new Error("TTS failed");

      if (audioRef.current) {
        audioRef.current.src = result.url;
        audioRef.current.volume = volume;
        audioRef.current.playbackRate = speed;
        await audioRef.current.play();
      }
    } catch (err) {
      console.error("Speak error:", err);
    } finally {
      setSpeaking(false);
    }
  };

  // ================= AUDIO SETTINGS =================
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = speed;
    }
  }, [volume, speed]);

  if (!icon) return <p className="text-center mt-5">Loading...</p>;

  // ================= THEMING =================
  const bgColor = theme === "dark" ? "#232323" : theme === "high-contrast" ? "#000000" : "#f8f9fa";
  const textColor = theme === "dark" ? "#f7f7f7" : theme === "high-contrast" ? "#ffff00" : "#212529";
  const cardBg = theme === "dark" ? "#2c2c2c" : theme === "high-contrast" ? "#000000" : "#fff";
  const controlBg = theme === "dark" ? "#2c2c2c" : theme === "high-contrast" ? "#000000" : "#343a40";

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", padding: "2rem", backgroundColor: bgColor, color: textColor }}
    >
      <div
        className="card shadow-lg p-4 rounded-4 d-flex flex-row align-items-start"
        style={{ maxWidth: "900px", width: "100%", gap: "24px", backgroundColor: cardBg, color: textColor, transition: "background-color 0.3s, color 0.3s" }}
      >
        {/* LEFT ICON */}
        <div className="text-center" style={{ minWidth: 280 }}>
          {icon.imageUrl ? (
            <img
              src={icon.imageUrl}
              alt={displayTitle}
              className="img-fluid rounded-3 shadow-sm"
              style={{ width: 200, height: 220, objectFit: "cover", transition: "transform 0.3s" }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onError={(e) => (e.target.src = "https://via.placeholder.com/250")}
            />
          ) : (
            <i
              className={`fa-solid fa-${icon.iconName}`}
              style={{ fontSize: 250, color: textColor, transition: "transform 0.3s" }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          )}
        </div>

        {/* RIGHT CONTENT */}
        <div style={{ width: "100%" }}>
          <h2 className="fw-bold mb-2">{displayTitle}</h2>
          <p className="fs-5 mb-3">{displayExpression}</p>

          {/* SPEAK BUTTON */}
          <button
            className="btn btn-primary mb-3"
            onClick={handleSpeak}
            disabled={speaking || !displayExpression}
          >
            {speaking ? (lang === "ar" ? "يتحدث..." : "Speaking...") : "🔊 Speak"}
          </button>

          {/* CONTROLS */}
          <div className="p-3 rounded-3" style={{ backgroundColor: controlBg, color: textColor, transition: "background-color 0.3s, color 0.3s" }}>
            {/* Volume */}
            <div className="d-flex align-items-center gap-3 mb-2">
              <label style={{ minWidth: 60 }}>{lang === "ar" ? "الصوت" : "Volume"}</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(+e.target.value)}
                style={{ flex: 1 }}
              />
              <span>{(volume * 100).toFixed(0)}%</span>
            </div>

            {/* Speed */}
            <div className="d-flex align-items-center gap-3">
              <label style={{ minWidth: 60 }}>{lang === "ar" ? "السرعة" : "Speed"}</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.05"
                value={speed}
                onChange={(e) => setSpeed(+e.target.value)}
                style={{ flex: 1 }}
              />
              <span>{speed.toFixed(2)}x</span>
            </div>
          </div>

          <audio ref={audioRef} hidden />
        </div>
      </div>
    </div>
  );
};

export default IconDetail;
