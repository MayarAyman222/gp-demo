import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getIconById } from "../api/iconApi"; 
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

const SubIconDashboard = () => {
  const { iconId } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const [icon, setIcon] = useState(null);
  const [subIcons, setSubIcons] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newSubIcon, setNewSubIcon] = useState({ title: "", expression: "", iconName: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [timeOption, setTimeOption] = useState(timeOptionsByLang[lang][0]);
  const [connector, setConnector] = useState(connectorOptionsByLang[lang][0]);

  useEffect(() => {
    setTimeOption(timeOptionsByLang[lang][0]);
    setConnector(connectorOptionsByLang[lang][0]);
  }, [lang]);

  useEffect(() => {
    const fetchIcon = async () => {
      try {
        const data = await getIconById(iconId); // {icon, subIcons}
        setIcon(data.icon);
        setSubIcons(data.subIcons || []);
      } catch (err) {
        console.error("Error fetching sub-icons:", err);
      }
    };
    fetchIcon();
  }, [iconId]);

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const generateSentence = () => {
    const expressions = selectedIds
      .map(id => {
        const ic = subIcons.find(i => i.id === id);
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
    setNewSubIcon({ ...newSubIcon, [e.target.name]: e.target.value });
  };

  const handleAddSubIcon = async () => {
    if (!newSubIcon.title.trim() || !newSubIcon.expression.trim() || !newSubIcon.iconName.trim()) {
      alert("All fields are required!");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/icons/${iconId}/subicons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSubIcon),
      });
      if (!response.ok) throw new Error("Failed to add subIcon");
      const savedSubIcon = await response.json();
      setSubIcons([...subIcons, savedSubIcon]);
      setNewSubIcon({ title: "", expression: "", iconName: "" });
      setShowModal(false);
    } catch (err) {
      console.error("Error adding subIcon:", err);
      alert("Failed to add subIcon. See console for details.");
    }
  };

  const filteredSubIcons = subIcons.filter(icon => {
    const title = icon[`title_${lang}`] || icon.title_en || "";
    const expr = icon[`expression_${lang}`] || icon.expression_en || "";
    return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           expr.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4" style={{ color: "red", fontWeight: "bold" }}>
        {icon?.title || "Sub Icons"}
      </h1>

      {/* Controls */}
      <div className="d-flex flex-wrap justify-content-start align-items-center mb-3 gap-2">
        <Form.Control
          type="text"
          placeholder="Search sub-icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "200px", marginLeft: "10px" }}
        />

        <Form.Select
          style={{ width: "120px" }}
          value={timeOption}
          onChange={(e) => setTimeOption(e.target.value)}
        >
          {timeOptionsByLang[lang].map(opt => <option key={opt}>{opt}</option>)}
        </Form.Select>

        <Form.Select
          style={{ width: "100px" }}
          value={connector}
          onChange={(e) => setConnector(e.target.value)}
        >
          {connectorOptionsByLang[lang].map(opt => <option key={opt}>{opt}</option>)}
        </Form.Select>

        <Button variant="primary" onClick={handleSpeak} disabled={speaking || selectedIds.length === 0}>
          {speaking ? "Speaking..." : "🔊 Speak"}
        </Button>

        <Button variant="primary" onClick={() => setShowModal(true)}>Add SubIcon</Button>
      </div>

      {/* Dynamic sentence */}
      {selectedIds.length > 0 && (
        <div className="mb-3 p-2 bg-light border rounded">
          <strong>Sentence: </strong>
          {generateSentence()}
        </div>
      )}

      {/* SubIcons Grid */}
      <div className="row g-3">
        {filteredSubIcons.map(icon => (
          <div key={icon.id} className="col-md-3">
            <div
              className="card shadow-sm rounded-3 text-center p-0 position-relative"
              style={{
                cursor: "pointer",
                height: "250px",
                backgroundColor: selectedIds.includes(icon.id) ? "#d4edda" : "white",
              }}
              onClick={() => navigate(`/subicondetails/${iconId}/${icon.id}`)}
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
          <Modal.Title>Add New SubIcon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter sub-icon title"
                name="title"
                value={newSubIcon.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expression</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter sub-icon expression"
                name="expression"
                value={newSubIcon.expression}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>FontAwesome Icon Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., coffee, face-smile"
                name="iconName"
                value={newSubIcon.iconName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button
            variant="primary"
            onClick={handleAddSubIcon}
            disabled={!newSubIcon.title.trim() || !newSubIcon.expression.trim() || !newSubIcon.iconName.trim()}
          >
            Add SubIcon
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubIconDashboard;
