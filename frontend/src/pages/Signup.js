import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { signup } from "../api/auth";

export default function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [condition, setCondition] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!firstName || !lastName || !email || !password || !condition) {
      setErrorMsg("Please fill all fields!");
      return;
    }

    try {
      await signup({
        firstName,
        lastName,
        email,
        password,
        condition,
      });

      // نجاح التسجيل → تحويل للـ login
      navigate("/");
    } catch (err) {
      setErrorMsg(err.message || "Signup failed");
    }
  };

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
      }}
    >
      <div
        className="card shadow-lg p-5 text-center"
        style={{
          maxWidth: "450px",
          width: "100%",
          borderRadius: "20px",
          backgroundColor: "#ffffffcc",
        }}
      >
        <h1 className="mb-2" style={{ fontWeight: "700", color: "#6a11cb" }}>
          VOXI
        </h1>
        <p style={{ color: "#2575fc", fontWeight: "500" }}>
          AAC Communication App – Create Account
        </p>

        {errorMsg && <div className="text-danger mb-2">{errorMsg}</div>}

        <form onSubmit={handleSignup}>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="form-select mb-3"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="">Select patient type</option>
            <option value="AUTISM">AUTISM</option>
            <option value="STROKE">STROKE</option>
            <option value="ALZHEIMER">ALZHEIMER</option>
            <option value="SPEECH_DELAY">SPEECH_DELAY</option>
            <option value="OTHER">OTHER</option>
          </select>

          <button
            type="submit"
            className="btn w-100"
            style={{
              background:
                "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
              color: "#fff",
            }}
          >
            Signup
          </button>
        </form>

        <p className="mt-3" style={{ color: "#6a11cb" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#ff7eb3", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
