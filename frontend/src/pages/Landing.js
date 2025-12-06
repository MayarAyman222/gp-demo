import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 fixed-top">
        <div className="container d-flex justify-content-between align-items-center">

          <a className="navbar-brand d-flex align-items-center gap-2" href="#">
            <img
              src="https://cdn-icons-png.flaticon.com/512/892/892781.png"
              alt="Voxi Logo"
              width="40"
            />
            <span style={{ fontSize: "22px", fontWeight: "700", color: "#2b2b2b" }}>
              Voxi
            </span>
          </a>

          <div className="d-flex gap-4">
            <a href="#home" className="fw-semibold text-dark text-decoration-none">Home</a>
            <a href="#features" className="fw-semibold text-dark text-decoration-none">Features</a>
            <a href="#how" className="fw-semibold text-dark text-decoration-none">How it Works</a>
            <a href="#users" className="fw-semibold text-dark text-decoration-none">Users</a>
            <a href="#about" className="fw-semibold text-dark text-decoration-none">About</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header
        id="home"
        className="d-flex align-items-center"
        style={{
          height: "100vh",
          paddingTop: "120px",
          background: "linear-gradient(to right, #f7f7f7, #ffffff)"
        }}
      >
        <div className="container">
          <div className="row align-items-center">

            <div className="col-md-6">
              <h1
                style={{
                  fontSize: "50px",
                  fontWeight: "800",
                  color: "#232323",
                }}
              >
                Communication For Everyone.
              </h1>

              <p className="mt-3" style={{ fontSize: "18px", lineHeight: "1.7", color: "#555" }}>
                Voxi helps individuals with communication challenges such as
                Alzheimer’s, stroke, autism, or speech difficulties express
                their thoughts clearly and confidently.
              </p>

              <button
                onClick={() => navigate("/category")}
                className="btn btn-dark mt-4 px-5 py-3 fw-bold"
                style={{ borderRadius: "12px", fontSize: "18px" }}
              >
                Start with Voxi →
              </button>
            </div>

            <div className="col-md-6 text-center">
              <img
               // src="https://cdn-icons-png.flaticon.com/512/2219/2219688.png"
                //alt="Communication Image"
                //className="img-fluid"
               // style={{ maxHeight: "380px" }}
              />
            </div>

          </div>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section id="features" className="py-5" style={{ background: "#fafafa" }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-4" style={{ color: "#232323" }}>Features</h2>

          <div className="row g-4 mt-3">
            <div className="col-md-4">
              <div className="p-4 shadow-sm rounded bg-white">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
                  width="60"
                  className="mb-3"
                />
                <h5 className="fw-bold mb-2">Easy Communication</h5>
                <p style={{ color: "#555" }}>
                  Express needs and feelings through intuitive visual icons.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 shadow-sm rounded bg-white">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
                  width="60"
                  className="mb-3"
                />
                <h5 className="fw-bold mb-2">Large Icon Library</h5>
                <p style={{ color: "#555" }}>
                  Hundreds of categorized icons for daily life communication.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 shadow-sm rounded bg-white">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1946/1946433.png"
                  width="60"
                  className="mb-3"
                />
                <h5 className="fw-bold mb-2">Fast & Simple</h5>
                <p style={{ color: "#555" }}>
                  Clean interface designed for seniors and kids.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how" className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4" style={{ color: "#232323" }}>How It Works</h2>

          <div className="row justify-content-center g-4 mt-3">

            <div className="col-md-3">
              <div className="p-4 rounded shadow-sm bg-white">
                <h3 className="fw-bold">1</h3>
                <h5 className="fw-bold mb-2">Choose Category</h5>
                <p style={{ color: "#555" }}>
                  Select from real-life, feelings, communication, and more.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-4 rounded shadow-sm bg-white">
                <h3 className="fw-bold">2</h3>
                <h5 className="fw-bold mb-2">Pick an Icon</h5>
                <p style={{ color: "#555" }}>
                  Tap any icon to hear or display its meaning instantly.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-3 rounded shadow-sm bg-white">
                <h3 className="fw-bold">3</h3>
                <h5 className="fw-bold mb-1">Communicate Fast</h5>
                <p style={{ color: "#555" }}>
                  Use Voxi anywhere to communicate clearly and confidently.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHO CAN USE VOXI */}
      <section id="users" className="py-5" style={{ background: "#fafafa" }}>
        <div className="container">
          <h2 className="fw-bold text-center mb-5" style={{ color: "#232323" }}>
            Who Can Use Voxi?
          </h2>

          <div className="row g-4">
            <div className="col-md-3 text-center">
                 <div className="p-4 rounded shadow-sm bg-white">

    <img 
      src="https://tse1.mm.bing.net/th/id/OIP.g43UzrQ28BR1bm2ZiHOjVgHaE9?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" 
      width="90"
      height="70"
      style={{ objectFit: "cover" }}
    />
    <h5 className="fw-bold mt-3">Autism</h5>
  </div>
  </div>

            <div className="col-md-3 text-center">
              <div className="p-4 rounded shadow-sm bg-white">
                <img src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" width="70" />
                <h5 className="fw-bold mt-3">Stroke Survivors</h5>
              </div>
            </div>

            <div className="col-md-3 text-center">
              <div className="p-4 rounded shadow-sm bg-white">
                <img src="https://cdn-icons-png.flaticon.com/512/1300/1300921.png" width="70" />
                <h5 className="fw-bold mt-3">Alzheimer’s</h5>
              </div>
            </div>

            <div className="col-md-3 text-center">
              <div className="p-4 rounded shadow-sm bg-white">
                <img src="https://cdn-icons-png.flaticon.com/512/2920/2920256.png" width="70" />
                <h5 className="fw-bold mt-3">Speech Difficulty</h5>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-5">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-md-6 text-center mb-4 mb-md-0">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1256/1256650.png"
                alt="About Voxi"
                className="img-fluid"
                style={{ maxHeight: "330px" }}
              />
            </div>

            <div className="col-md-6">
              <h2 className="fw-bold mb-3" style={{ color: "#232323", fontSize: "32px" }}>
                About Voxi
              </h2>

              <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#555" }}>
                Voxi is built to make communication smooth, accessible, and
                human-centered. Our app provides ready-to-use visual icons and
                phrases that simplify daily interactions.
              </p>

              <p style={{ fontSize: "18px", color: "#555" }}>
                Whether it's emotions, needs, or everyday activities—Voxi helps
                bridge the communication gap.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-white py-4" style={{ background: "#1e1e1e" }}>
        <h5 className="fw-bold mb-0">© 2025 Voxi — Communication For Everyone</h5>
      </footer>

    </div>
  );
};

export default Landing;
