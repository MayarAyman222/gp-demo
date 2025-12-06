import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getIconById } from "../api/iconApi"; // API بترجع icon مع subIcons
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { translateText, speakText } from "../api/tts-translate-api";

const SubIconDashboard = () => {
  const { iconId } = useParams();
  const navigate = useNavigate();

  const [icon, setIcon] = useState(null);
  const [subIcons, setSubIcons] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [translatedText, setTranslatedText] = useState("");
  const [lang, setLang] = useState("en");
  const [timeOption, setTimeOption] = useState("Today");
  const [connector, setConnector] = useState("and");
  const [loadingTrans, setLoadingTrans] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [newSubIcon, setNewSubIcon] = useState({ title: "", expression: "", iconName: "" });

  const [searchTerm, setSearchTerm] = useState("");

  // Fetch icon + subIcons
  useEffect(() => {
    const fetchIcon = async () => {
      try {
        const data = await getIconById(iconId); // data.icon و data.subIcons
        setIcon(data.icon);
        setSubIcons(data.subIcons || []);
      } catch (err) {
        console.error("Error fetching icon:", err);
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
    const expressions = selectedIds.map(id => subIcons.find(ic => ic.id === id)?.expression);
    if (expressions.length === 0) return "";
    return `${timeOption} ${expressions.join(` ${connector} `)}`;
  };

  const handleTranslate = async () => {
    const sentence = generateSentence();
    if (!sentence) return;
    setLoadingTrans(true);
    try {
      const result = await translateText(sentence, lang);
      if (result.ok) setTranslatedText(result.translatedText);
      else setTranslatedText(sentence);
    } catch (err) {
      console.error("Translate error:", err);
      alert("Translation error");
    } finally {
      setLoadingTrans(false);
    }
  };

  const handleSpeak = async () => {
    const sentence = translatedText || generateSentence();
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

  const filteredSubIcons = subIcons.filter(ic =>
    ic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ic.expression.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4" style={{ color: "red", fontWeight: "bold" }}>
        {icon?.title} SubIcons
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
        <Form.Select style={{ width: "120px" }} value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
        </Form.Select>

        <Form.Select style={{ width: "120px" }} value={timeOption} onChange={(e) => setTimeOption(e.target.value)}>
          <option>Today</option>
          <option>Yesterday</option>
          <option>Tomorrow</option>
        </Form.Select>

        <Form.Select style={{ width: "100px" }} value={connector} onChange={(e) => setConnector(e.target.value)}>
          <option>and</option>
          <option>or</option>
          <option>then</option>
        </Form.Select>

        <Button variant="success" onClick={handleTranslate} disabled={loadingTrans || selectedIds.length === 0}>
          {loadingTrans ? "Translating..." : "Translate"}
        </Button>

        <Button variant="primary" onClick={handleSpeak} disabled={speaking || selectedIds.length === 0}>
          {speaking ? "Speaking..." : "🔊 Speak"}
        </Button>

        <Button variant="primary" onClick={() => setShowModal(true)}>Add SubIcon</Button>
      </div>

      {/* Dynamic sentence */}
      {selectedIds.length > 0 && (
        <div className="mb-3 p-2 bg-light border rounded">
          <strong>Sentence: </strong>
          {translatedText || generateSentence()}
        </div>
      )}

      {/* SubIcons Grid */}
      <div className="row g-3">
        {filteredSubIcons.map((subIcon) => (
          <div key={subIcon.id} className="col-md-3">
            <div
              className="card shadow-sm rounded-3 text-center p-2"
              style={{
                cursor: "pointer",
                backgroundColor: selectedIds.includes(subIcon.id) ? "#d4edda" : "white",
              }}
              onClick={() => navigate(`/subicondetails/${icon.id}/${subIcon.id}`)}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selectedIds.includes(subIcon.id)}
                onClick={(e) => e.stopPropagation()}
                onChange={() => toggleSelect(subIcon.id)}
                style={{ marginBottom: "10px" }}
              />

              {/* Image or Icon */}
              {subIcon.imageUrl ? (
                <img
                  src={subIcon.imageUrl}
                  alt={subIcon.title}
                  className="img-fluid mb-2"
                  style={{ objectFit: "cover", height: "180px", width: "100%" }}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/250")}
                />
              ) : (
                <i
                  className={`fas fa-${subIcon.iconName} fa-4x mb-2`}
                  style={{ color: "#333" }}
                ></i>
              )}

              {/* Text below image */}
              <h5>{subIcon.title}</h5>
              <p style={{ fontSize: "0.9rem" }}>{subIcon.expression}</p>
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
