/*import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllIcons } from "../api/iconApi";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { translateText, speakText } from "../api/tts-translate-api";

const Dashboard = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [icons, setIcons] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [translatedText, setTranslatedText] = useState("");
  const [lang, setLang] = useState("en");
  const [timeOption, setTimeOption] = useState("Today");
  const [connector, setConnector] = useState("and");
  const [loadingTrans, setLoadingTrans] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [newIcon, setNewIcon] = useState({ title: "", expression: "", iconName: "" });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const data = await getAllIcons(category);
        // إزالة duplicates حسب id
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
    const expressions = selectedIds.map(id => icons.find(ic => ic.id === id)?.expression);
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

  // فلترة الأيقونات حسب search
  const filteredIcons = icons.filter(icon =>
    icon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    icon.expression.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        <Button variant="primary" onClick={() => setShowModal(true)}>Add Icon</Button>
       {/* Search input *}
     
         </div>

     

      {/* Dynamic sentence *}
      {selectedIds.length > 0 && (
        <div className="mb-3 p-2 bg-light border rounded">
          <strong>Sentence: </strong>
          {translatedText || generateSentence()}
        </div>
      )}

      {/* Icons Grid *}
      <div className="row g-3">
        {filteredIcons.map((icon) => (
          <div key={icon.id} className="col-md-3">
            <div
              className="card shadow-sm rounded-3 text-center p-0 position-relative"
              style={{
                cursor: "pointer",
                height: "250px",
                backgroundColor: selectedIds.includes(icon.id) ? "#d4edda" : "white",
              }}
              onClick={() => {
                if (selectedIds.length === 0) navigate(`/icon/${icon.id}`);
              }}
            >
              {/* Checkbox *}
              <input
                type="checkbox"
                checked={selectedIds.includes(icon.id)}
                onClick={(e) => e.stopPropagation()}
                onChange={() => toggleSelect(icon.id)}
                style={{ position: "absolute", top: 5, left: 5, zIndex: 2 }}
              />

              {icon.imageUrl ? (
                <img
                  src={icon.imageUrl}
                  alt={icon.title}
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/250")}
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
                <h5 className="mb-1">{icon.title}</h5>
                <p className="mb-0" style={{ fontSize: "0.9rem" }}>{icon.expression}</p>
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
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllIcons } from "../api/iconApi";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { translateText, speakText } from "../api/tts-translate-api";

const Dashboard = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [icons, setIcons] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [translatedText, setTranslatedText] = useState("");
  const [lang, setLang] = useState("en");
  const [timeOption, setTimeOption] = useState("Today");
  const [connector, setConnector] = useState("and");
  const [loadingTrans, setLoadingTrans] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [newIcon, setNewIcon] = useState({ title: "", expression: "", iconName: "" });

  const [searchTerm, setSearchTerm] = useState("");

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
    const expressions = selectedIds.map(id => icons.find(ic => ic.id === id)?.expression);
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

  // فلترة الأيقونات حسب search
  const filteredIcons = icons.filter(icon =>
    icon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    icon.expression.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // تعديل عند الضغط على أي icon حسب وجود subIcons
  const handleIconClick = (icon) => {
    if (selectedIds.length > 0) return; // لو فيه اختيار متعدد ما نفتحش التفاصيل
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

      {/* Controls */}
      <div className="d-flex flex-wrap justify-content-start align-items-center mb-3 gap-2">
        <Form.Control
          type="text"
          placeholder="Search icons..."
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

        <Button variant="primary" onClick={() => setShowModal(true)}>Add Icon</Button>
      </div>

      {/* Dynamic sentence */}
      {selectedIds.length > 0 && (
        <div className="mb-3 p-2 bg-light border rounded">
          <strong>Sentence: </strong>
          {translatedText || generateSentence()}
        </div>
      )}

      {/* Icons Grid */}
      <div className="row g-3">
        {filteredIcons.map((icon) => (
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
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selectedIds.includes(icon.id)}
                onClick={(e) => e.stopPropagation()}
                onChange={() => toggleSelect(icon.id)}
                style={{ position: "absolute", top: 5, left: 5, zIndex: 2 }}
              />

              {icon.imageUrl ? (
                <img
                  src={icon.imageUrl}
                  alt={icon.title}
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/250")}
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
                <h5 className="mb-1">{icon.title}</h5>
                <p className="mb-0" style={{ fontSize: "0.9rem" }}>{icon.expression}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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

export default Dashboard;

