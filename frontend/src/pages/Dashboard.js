/*import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllIcons } from "../api/iconApi";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { speakText } from "../api/tts-translate-api";
import { useLanguage } from "../context/LanguageContext";

const timeOptionsByLang = {
  en: ["Today", "Yesterday", "Tomorrow"],
  ar: ["اليوم", "أمس", "غدًا"],
  fr: ["Aujourd'hui", "Hier", "Demain"],
  es: ["Hoy", "Ayer", "Mañana"]
};

const connectorOptionsByLang = {
  en: ["and", "or", "then"],
  ar: ["و", "أو", "ثم"],
  fr: ["et", "ou", "puis"],
  es: ["y", "o", "entonces"]
};

const Dashboard = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage(); // global language

  const [icons, setIcons] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [speaking, setSpeaking] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [newIcon, setNewIcon] = useState({ title: "", expression: "", iconName: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [timeOption, setTimeOption] = useState(timeOptionsByLang[lang][0]);
  const [connector, setConnector] = useState(connectorOptionsByLang[lang][0]);

  useEffect(() => {
    // Reset timeOption & connector if lang changes
    setTimeOption(timeOptionsByLang[lang][0]);
    setConnector(connectorOptionsByLang[lang][0]);
  }, [lang]);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const data = await getAllIcons(category);
        const uniqueIcons = Array.from(new Map(data.map(i => [i.id, i])).values());
        setIcons(uniqueIcons);
      } catch (err) {
        console.error("Error fetching icons:", err);
      }
    };
    fetchIcons();
  }, [category]);

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const generateSentence = () => {
    const expressions = selectedIds
      .map(id => {
        const ic = icons.find(i => i.id === id);
        return ic ? ic[`expression_${lang}`] || ic.expression_en : "";
      })
      .filter(Boolean);
    if (expressions.length === 0) return "";
    return `${timeOption} ${expressions.join(` ${connector} `)}`;
  };

  const handleSpeak = async () => {
    const sentence = generateSentence();
    if (!sentence) return;
    setSpeaking(true);
    try {
      const result = await speakText(sentence, lang);
      if (result.ok) {
        const audio = new Audio(result.url);
        await audio.play();
      }
    } catch (err) {
      console.error("TTS error:", err);
      alert("Error generating speech");
    } finally {
      setSpeaking(false);
    }
  };

  const handleInputChange = (e) => {
    setNewIcon({ ...newIcon, [e.target.name]: e.target.value });
  };

  const handleAddIcon = async () => {
    if (!newIcon.title.trim() || !newIcon.expression.trim() || !newIcon.iconName.trim()) {
      alert("All fields are required!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/icons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newIcon, category }),
      });
      if (!response.ok) throw new Error("Failed to add icon");
      const savedIcon = await response.json();
      setIcons([...icons, savedIcon]);
      setNewIcon({ title: "", expression: "", iconName: "" });
      setShowModal(false);
    } catch (err) {
      console.error("Error adding icon:", err);
      alert("Failed to add icon. See console for details.");
    }
  };

  const filteredIcons = icons.filter(icon => {
    const title = icon[`title_${lang}`] || icon.title_en || "";
    const expr = icon[`expression_${lang}`] || icon.expression_en || "";
    return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           expr.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleIconClick = (icon) => {
    if (selectedIds.length > 0) return;
    if (icon.subIcons && icon.subIcons.length > 0) {
      navigate(`/subicons/${icon.id}`);
    } else {
      navigate(`/icon/${icon.id}`);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4" style={{ color: "red", fontWeight: "bold" }}>
        Welcome to Voxi
      </h1>
      <h4 className="text-center mb-4">Category: {category}</h4>

      {/* Controls *}
      <div className="d-flex flex-wrap justify-content-start align-items-center mb-3 gap-2">
        <Form.Control
          type="text"
          placeholder="Search icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "200px", marginLeft: "10px" }}
        />

        <Form.Select
          style={{ width: "120px" }}
          value={timeOption}
          onChange={(e) => setTimeOption(e.target.value)}
        >
          {timeOptionsByLang[lang].map(opt => (
            <option key={opt}>{opt}</option>
          ))}
        </Form.Select>

        <Form.Select
          style={{ width: "100px" }}
          value={connector}
          onChange={(e) => setConnector(e.target.value)}
        >
          {connectorOptionsByLang[lang].map(opt => (
            <option key={opt}>{opt}</option>
          ))}
        </Form.Select>

        <Button variant="primary" onClick={handleSpeak} disabled={speaking || selectedIds.length === 0}>
          {speaking ? "Speaking..." : "🔊 Speak"}
        </Button>

        <Button variant="primary" onClick={() => setShowModal(true)}>Add Icon</Button>
      </div>

      {/* Dynamic sentence *}
      {selectedIds.length > 0 && (
        <div className="mb-3 p-2 bg-light border rounded">
          <strong>Sentence: </strong>
          {generateSentence()}
        </div>
      )}

      {/* Icons Grid *}
      <div className="row g-3">
        {filteredIcons.map(icon => (
          <div key={icon.id} className="col-md-3">
            <div
              className="card shadow-sm rounded-3 text-center p-0 position-relative"
              style={{
                cursor: "pointer",
                height: "250px",
                backgroundColor: selectedIds.includes(icon.id) ? "#d4edda" : "white",
              }}
              onClick={() => handleIconClick(icon)}
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(icon.id)}
                onClick={e => e.stopPropagation()}
                onChange={() => toggleSelect(icon.id)}
                style={{ position: "absolute", top: 5, left: 5, zIndex: 2 }}
              />

              {icon.imageUrl ? (
                <img
                  src={icon.imageUrl}
                  alt={icon[`title_${lang}`] || icon.title_en}
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
                  onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
                  onError={e => (e.target.src = "https://via.placeholder.com/250")}
                />
              ) : (
                <i
                  className={`fas fa-${icon.iconName} fa-6x`}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#333",
                  }}
                ></i>
              )}

              <div className="position-absolute bottom-0 w-100 text-white p-2" style={{ background: "rgba(0,0,0,0.5)", textAlign: "center" }}>
                <h5 className="mb-1">{icon[`title_${lang}`] || icon.title_en}</h5>
                <p className="mb-0" style={{ fontSize: "0.9rem" }}>{icon[`expression_${lang}`] || icon.expression_en}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal *}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Icon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter icon title"
                name="title"
                value={newIcon.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expression</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter icon expression"
                name="expression"
                value={newIcon.expression}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>FontAwesome Icon Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., coffee, face-smile"
                name="iconName"
                value={newIcon.iconName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button
            variant="primary"
            onClick={handleAddIcon}
            disabled={!newIcon.title.trim() || !newIcon.expression.trim() || !newIcon.iconName.trim()}
          >
            Add Icon
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;*/
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllIcons } from "../api/iconApi";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { speakText } from "../api/tts-translate-api";
import { useLanguage } from "../context/LanguageContext";

const timeOptionsByLang = {
  en: ["Today", "Yesterday", "Tomorrow"],
  ar: ["اليوم", "أمس", "غدًا"],
  fr: ["Aujourd'hui", "Hier", "Demain"],
  es: ["Hoy", "Ayer", "Mañana"]
};

const connectorOptionsByLang = {
  en: ["and", "or", "then"],
  ar: ["و", "أو", "ثم"],
  fr: ["et", "ou", "puis"],
  es: ["y", "o", "entonces"]
};

const welcomeByLang = {
  en: "Welcome to Voxi",
  ar: "مرحبا بك في فوكسى",
  fr: "Bienvenue sur Voxi",
  es: "Bienvenido a Voxi"
};

const categoryByLang = (category, lang) => {
  // إذا عندك ترجمة محددة لكل category ممكن تحطها هنا
  const translations = {
    en: category,
    ar: category, // ممكن تغير translation لكل category
    fr: category,
    es: category
  };
  return translations[lang] || category;
};

const Dashboard = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage(); // global language

  const [icons, setIcons] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [speaking, setSpeaking] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [newIcon, setNewIcon] = useState({ title: "", expression: "", iconName: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [timeOption, setTimeOption] = useState(timeOptionsByLang[lang][0]);
  const [connector, setConnector] = useState(connectorOptionsByLang[lang][0]);

  useEffect(() => {
    setTimeOption(timeOptionsByLang[lang][0]);
    setConnector(connectorOptionsByLang[lang][0]);
  }, [lang]);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const data = await getAllIcons(category);
        const uniqueIcons = Array.from(new Map(data.map(i => [i.id, i])).values());
        setIcons(uniqueIcons);
      } catch (err) {
        console.error("Error fetching icons:", err);
      }
    };
    fetchIcons();
  }, [category]);

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const generateSentence = () => {
    const expressions = selectedIds
      .map(id => {
        const ic = icons.find(i => i.id === id);
        return ic ? ic[`expression_${lang}`] || ic.expression_en : "";
      })
      .filter(Boolean);
    if (expressions.length === 0) return "";
    return `${timeOption} ${expressions.join(` ${connector} `)}`;
  };

  const handleSpeak = async () => {
    const sentence = generateSentence();
    if (!sentence) return;
    setSpeaking(true);
    try {
      const result = await speakText(sentence, lang);
      if (result.ok) {
        const audio = new Audio(result.url);
        await audio.play();
      }
    } catch (err) {
      console.error("TTS error:", err);
      alert("Error generating speech");
    } finally {
      setSpeaking(false);
    }
  };

  const handleInputChange = (e) => {
    setNewIcon({ ...newIcon, [e.target.name]: e.target.value });
  };

  const handleAddIcon = async () => {
    if (!newIcon.title.trim() || !newIcon.expression.trim() || !newIcon.iconName.trim()) {
      alert("All fields are required!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/icons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newIcon, category }),
      });
      if (!response.ok) throw new Error("Failed to add icon");
      const savedIcon = await response.json();
      setIcons([...icons, savedIcon]);
      setNewIcon({ title: "", expression: "", iconName: "" });
      setShowModal(false);
    } catch (err) {
      console.error("Error adding icon:", err);
      alert("Failed to add icon. See console for details.");
    }
  };

  const filteredIcons = icons.filter(icon => {
    const title = icon[`title_${lang}`] || icon.title_en || "";
    const expr = icon[`expression_${lang}`] || icon.expression_en || "";
    return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           expr.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleIconClick = (icon) => {
    if (selectedIds.length > 0) return;
    if (icon.subIcons && icon.subIcons.length > 0) {
      navigate(`/subicons/${icon.id}`);
    } else {
      navigate(`/icon/${icon.id}`);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-2" style={{ color: "red", fontWeight: "bold" }}>
        {welcomeByLang[lang] || welcomeByLang.en}
      </h1>
      <h4 className="text-center mb-4">{categoryByLang(category, lang)}</h4>

      {/* Controls */}
      <div className="d-flex flex-wrap justify-content-start align-items-center mb-3 gap-2">
        <Form.Control
          type="text"
          placeholder={lang === 'ar' ? "ابحث عن الأيقونات..." : "Search icons..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "200px", marginLeft: "10px" }}
        />

        <Form.Select
          style={{ width: "120px" }}
          value={timeOption}
          onChange={(e) => setTimeOption(e.target.value)}
        >
          {timeOptionsByLang[lang].map(opt => (
            <option key={opt}>{opt}</option>
          ))}
        </Form.Select>

        <Form.Select
          style={{ width: "100px" }}
          value={connector}
          onChange={(e) => setConnector(e.target.value)}
        >
          {connectorOptionsByLang[lang].map(opt => (
            <option key={opt}>{opt}</option>
          ))}
        </Form.Select>

        <Button variant="primary" onClick={handleSpeak} disabled={speaking || selectedIds.length === 0}>
          {speaking ? (lang === 'ar' ? "يتحدث..." : "Speaking...") : "🔊 Speak"}
        </Button>

        <Button variant="primary" onClick={() => setShowModal(true)}>
          {lang === 'ar' ? "أضف أيقونة" : "Add Icon"}
        </Button>
      </div>

      {/* Dynamic sentence */}
      {selectedIds.length > 0 && (
        <div className="mb-3 p-2 bg-light border rounded">
          <strong>{lang === 'ar' ? "الجملة: " : "Sentence: "}</strong>
          {generateSentence()}
        </div>
      )}

      {/* Icons Grid */}
      <div className="row g-3">
        {filteredIcons.map(icon => (
          <div key={icon.id} className="col-md-3">
            <div
              className="card shadow-sm rounded-3 text-center p-0 position-relative"
              style={{
                cursor: "pointer",
                height: "250px",
                backgroundColor: selectedIds.includes(icon.id) ? "#d4edda" : "white",
              }}
              onClick={() => handleIconClick(icon)}
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(icon.id)}
                onClick={e => e.stopPropagation()}
                onChange={() => toggleSelect(icon.id)}
                style={{ position: "absolute", top: 5, left: 5, zIndex: 2 }}
              />

              {icon.imageUrl ? (
                <img
                  src={icon.imageUrl}
                  alt={icon[`title_${lang}`] || icon.title_en}
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
                  onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
                  onError={e => (e.target.src = "https://via.placeholder.com/250")}
                />
              ) : (
                <i
                  className={`fas fa-${icon.iconName} fa-6x`}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#333",
                  }}
                ></i>
              )}

              <div className="position-absolute bottom-0 w-100 text-white p-2" style={{ background: "rgba(0,0,0,0.5)", textAlign: "center" }}>
                <h5 className="mb-1">{icon[`title_${lang}`] || icon.title_en}</h5>
                <p className="mb-0" style={{ fontSize: "0.9rem" }}>{icon[`expression_${lang}`] || icon.expression_en}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{lang === 'ar' ? "إضافة أيقونة جديدة" : "Add New Icon"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{lang === 'ar' ? "العنوان" : "Title"}</Form.Label>
              <Form.Control
                type="text"
                placeholder={lang === 'ar' ? "أدخل عنوان الأيقونة" : "Enter icon title"}
                name="title"
                value={newIcon.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{lang === 'ar' ? "التعبير" : "Expression"}</Form.Label>
              <Form.Control
                type="text"
                placeholder={lang === 'ar' ? "أدخل تعبير الأيقونة" : "Enter icon expression"}
                name="expression"
                value={newIcon.expression}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{lang === 'ar' ? "اسم أيقونة FontAwesome" : "FontAwesome Icon Name"}</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., coffee, face-smile"
                name="iconName"
                value={newIcon.iconName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {lang === 'ar' ? "إلغاء" : "Cancel"}
          </Button>
          <Button
            variant="primary"
            onClick={handleAddIcon}
            disabled={!newIcon.title.trim() || !newIcon.expression.trim() || !newIcon.iconName.trim()}
          >
            {lang === 'ar' ? "أضف أيقونة" : "Add Icon"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
