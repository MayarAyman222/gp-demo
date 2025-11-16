import React, { useEffect, useState } from "react";
import { getAllIcons } from "../api/iconApi"; // GET API
import { Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
  const [icons, setIcons] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newIcon, setNewIcon] = useState({
    title: "",
    expression: "",
    iconName: "",
  });

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const data = await getAllIcons();
        setIcons(data);
      } catch (err) {
        console.error("Error fetching icons:", err);
      }
    };
    fetchIcons();
  }, []);

  const filteredIcons = icons.filter(
    (icon) =>
      icon.title.toLowerCase().includes(search.toLowerCase()) ||
      icon.expression.toLowerCase().includes(search.toLowerCase())
  );

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
        body: JSON.stringify(newIcon),
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

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">All Icons</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          placeholder="Search icons..."
          className="form-control w-50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="primary"
          onClick={() => {
            setNewIcon({ title: "", expression: "", iconName: "" });
            setShowModal(true);
          }}
        >
          Add Icon
        </Button>
      </div>

      <div className="row g-3">
        {filteredIcons.map((icon) => (
          <div key={icon.id} className="col-md-3">
            <Link
              to={`/icon/${icon.id}`}
              className="card shadow-sm rounded-3 text-decoration-none text-dark p-0"
              style={{ overflow: "hidden", height: "250px", position: "relative" }}
            >
              {/* Image or Icon */}
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

              {/* Overlay with Title & Expression */}
              <div
                className="position-absolute bottom-0 w-100 text-white p-2"
                style={{ background: "rgba(0,0,0,0.5)", textAlign: "center" }}
              >
                <h5 className="mb-1">{icon.title}</h5>
                <p className="mb-0" style={{ fontSize: "0.9rem" }}>
                  {icon.expression}
                </p>
              </div>
            </Link>
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
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

export default Home;
