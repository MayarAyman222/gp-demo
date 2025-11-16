import React, { useEffect, useState, useRef } from "react";
import { getIconById } from "../api/iconApi";
import { useParams } from "react-router-dom";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';

const IconDetail = () => {
  const { id } = useParams();
  const [icon, setIcon] = useState(null);
  const [lang, setLang] = useState("en");
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchIcon = async () => {
      try {
        const data = await getIconById(id);
        setIcon(data);
      } catch (err) {
        console.error("Error fetching icon:", err);
      }
    };
    fetchIcon();
  }, [id]);

  const speak = async () => {
    if (!icon?.expression) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/tts",
        { text: icon.expression, lang },
        { responseType: "arraybuffer" }  
      );

      const audioBlob = new Blob([res.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }
    } catch (err) {
      console.error("TTS error:", err);
      alert("Error generating speech");
    }
  };

  if (!icon) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4 rounded-4 d-flex flex-row align-items-center"
        style={{ maxWidth: "850px" }}
      >
        {/* Icon / Image */}
        <div className="text-center me-4">
          {icon.imageUrl ? (
            <img
              src={icon.imageUrl}
              alt={icon.title}
              className="img-fluid rounded-3 shadow-sm"
              style={{
                width: "250px",
                height: "250px",
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onError={(e) => (e.target.src = "https://via.placeholder.com/250")}
            />
          ) : (
            <i
              className={`fas fa-${icon.iconName}`}
              style={{
                fontSize: "250px",
                color: "#333",
                transition: "transform 0.3s ease",
              }}
            ></i>
          )}
        </div>

        {/* Info Section */}
        <div>
          <h2 className="fw-bold mb-2">{icon.title}</h2>
          <p className="text-muted fs-5 mb-3">{icon.expression}</p>

          <div className="d-flex align-items-center gap-3 mt-3">
            {/* Language Selector */}
            <select
              className="form-select w-auto"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>

            <button
              className="btn btn-primary px-4 py-2 rounded-3 shadow-sm"
              onClick={speak}
            >
              🔊 Speak
            </button>
          </div>

          <audio ref={audioRef} />
        </div>
      </div>
    </div>
  );
};

export default IconDetail;
