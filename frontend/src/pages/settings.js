import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

// ترجمة لكل النصوص في الصفحة حسب اللغة
const settingsTexts = {
  en: {
    title: "Settings",
    theme: "Color Theme",
    language: "Language",
    buttons: {
      light: "LIGHT",
      dark: "DARK",
      "high-contrast": "HIGH CONTRAST",
    },
  },
  ar: {
    title: "الإعدادات",
    theme: "اختيار اللون",
    language: "اللغة",
    buttons: {
      light: "فاتح",
      dark: "داكن",
      "high-contrast": "تباين عالي",
    },
  },
  fr: {
    title: "Paramètres",
    theme: "Thème de couleur",
    language: "Langue",
    buttons: {
      light: "CLAIR",
      dark: "SOMBRE",
      "high-contrast": "HAUT CONTRASTE",
    },
  },
  es: {
    title: "Configuración",
    theme: "Tema de color",
    language: "Idioma",
    buttons: {
      light: "CLARO",
      dark: "OSCURA",
      "high-contrast": "ALTO CONTRASTE",
    },
  },
};

const Settings = () => {
  const { theme, setTheme, language, setLanguage } = useContext(AppContext);
  const t = settingsTexts[language];

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        padding: "50px",
        minHeight: "100vh",
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <h1 style={{ color: "white", backgroundColor: "green", marginBottom: "10px", fontSize: "2.5rem" }}>
        {t.title}
      </h1>

      {/* Theme Selection */}
      <div
        className="card p-4 mb-5"
        style={{
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          backgroundColor: "var(--card-bg)",
          marginTop:"70px",
        }}
      >
        <h3 style={{ color: "#4CAF50", marginBottom: "20px" }}>{t.theme}</h3>
        <div className="d-flex gap-3">
          {["light", "dark", "high-contrast"].map((tName) => (
            <button
              key={tName}
              className={`btn ${theme === tName ? "btn-success" : "btn-outline-secondary"}`}
              onClick={() => setTheme(tName)}
              style={{
                minWidth: "120px",
                fontWeight: "600",
                transition: "all 0.3s",
              }}
            >
              {t.buttons[tName]}
            </button>
          ))}
        </div>
      </div>

      {/* Language Selection */}
      <div
        className="card p-4"
        style={{
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          backgroundColor: "var(--card-bg)",
        }}
      >
        <h3 style={{ color: "#4CAF50", marginBottom: "20px" }}>{t.language}</h3>
        <select
          className="form-select w-auto"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            backgroundColor: "var(--card-bg)",
            color: "var(--text-color)",
            borderColor: "var(--text-color)",
            fontWeight: "500",
            padding: "10px 15px",
            borderRadius: "8px",
            transition: "all 0.3s",
          }}
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
