import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getSubIconById } from "../api/iconApi"; // لازم تضيف الـ API دي
import { translateText, speakText } from "../api/tts-translate-api";
import '@fortawesome/fontawesome-free/css/all.min.css';

const SubIconDetails = () => {
    const { iconId, subIconId } = useParams();
  const [subIcon, setSubIcon] = useState(null);

  // Translation states
  const [lang, setLang] = useState("en");
  const [translated, setTranslated] = useState("");
  const [loadingTrans, setLoadingTrans] = useState(false);

  // Audio & volume
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [speaking, setSpeaking] = useState(false);

  // Fetch subIcon data
  useEffect(() => {
    const fetchSubIcon = async () => {
      try {
        const data = await getSubIconById(iconId, subIconId);

        setSubIcon(data);
      } catch (err) {
        console.error("Error fetching subIcon:", err);
      }
    };
    fetchSubIcon();
  }, [subIconId]);

  // Update audio element volume & speed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = speed;
    }
  }, [volume, speed]);

  // Translate
  const handleTranslate = async () => {
    if (!subIcon?.expression) return;
    setLoadingTrans(true);
    try {
      const result = await translateText(subIcon.expression, lang);
      if (result.ok) setTranslated(result.translatedText);
      else alert("Translation failed");
    } catch (err) {
      console.error("Translate error:", err);
      alert("Translation error");
    } finally {
      setLoadingTrans(false);
    }
  };

  // Speak
  const handleSpeak = async () => {
    const txt = translated || subIcon.expression;
    if (!txt) return;

    try {
      setSpeaking(true);
      const result = await speakText(txt, lang);
      if (!result.ok) throw new Error(result.message || "TTS failed");

      if (audioRef.current) {
        audioRef.current.src = result.url;
        audioRef.current.volume = volume;
        audioRef.current.playbackRate = speed;
        await audioRef.current.play();
      } else {
        const audio = new Audio(result.url);
        audio.volume = volume;
        audio.playbackRate = speed;
        await audio.play();
      }
    } catch (err) {
      console.error("TTS error:", err);
      alert("Error generating speech");
    } finally {
      setSpeaking(false);
    }
  };

  if (!subIcon) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "100vh", padding: "2rem" }}
    >
      <div
        className="card shadow-lg p-4 rounded-4 d-flex flex-row align-items-start"
        style={{
          maxWidth: "900px",
          width: "100%",
          gap: "24px",
        }}
      >
        {/* Left: Image/Icon */}
        <div className="text-center" style={{ minWidth: 280 }}>
          {subIcon?.imageUrl ? (
            <img
              src={subIcon.imageUrl}
              alt={subIcon.title}
              className="img-fluid rounded-3 shadow-sm"
              style={{ width: 250, height: 250, objectFit: "cover" }}
            />
          ) : subIcon?.iconName ? (
            <i
              className={`fa-solid fa-${subIcon.iconName}`}
              style={{ fontSize: 250, color: "#333" }}
            ></i>
          ) : (
            <div
              style={{
                width: 250,
                height: 250,
                background: "#ddd",
                borderRadius: 10,
              }}
              className="d-flex justify-content-center align-items-center"
            >
              <span style={{ fontSize: 24, color: "#555" }}>No Icon</span>
            </div>
          )}
        </div>

        {/* Right: Info + Controls */}
        <div style={{ width: "100%" }}>
          <h2 className="fw-bold mb-2">{subIcon.title}</h2>
          <p className="text-muted fs-5 mb-3">{subIcon.expression}</p>

          {/* Controls */}
          <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
            <select
              className="form-select w-auto"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="en">English</option>
              <option value="ar">Arabic</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
            </select>

            <button
              className="btn btn-success"
              onClick={handleTranslate}
              disabled={loadingTrans}
            >
              {loadingTrans ? "Translating..." : "Translate"}
            </button>

            <button
              className="btn btn-primary"
              onClick={handleSpeak}
              disabled={speaking}
            >
              {speaking ? "Speaking..." : "🔊 Speak"}
            </button>
          </div>

          {/* Translated text + volume + speed */}
          <div className="p-3 rounded-3 bg-dark text-white mt-3">
            {translated && (
              <>
                <h5 className="mb-2">Translated Text:</h5>
                <p style={{ fontSize: "1.05rem", marginBottom: 12 }}>{translated}</p>
              </>
            )}

            {/* Volume bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <label style={{ minWidth: 60 }}>Volume</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{ flex: 1 }}
              />
              <div style={{ minWidth: 60, textAlign: "right" }}>
                {(volume * 100).toFixed(0)}%
              </div>
            </div>

            {/* Speed bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <label style={{ minWidth: 60 }}>Speed</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.05"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                style={{ flex: 1 }}
              />
              <div style={{ minWidth: 60, textAlign: "right" }}>
                {speed.toFixed(2)}x
              </div>
            </div>
          </div>

          {/* hidden audio element */}
          <audio ref={audioRef} style={{ display: "none" }} onEnded={() => setSpeaking(false)} />
        </div>
      </div>
    </div>
  );
};

export default SubIconDetails;
