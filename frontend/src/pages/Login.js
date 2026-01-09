import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("Please enter email and password!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // حفظ user info عشان Navbar
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        navigate("/landing");
      } else {
        setErrorMsg(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Server error. Try again later.");
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center" 
         style={{background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)"}}>
      <div className="card shadow-lg p-5 text-center" style={{ maxWidth: "450px", width: "100%", borderRadius: "20px", backgroundColor: "#ffffffcc" }}>
        <h1 className="mb-2" style={{ fontWeight: "700", color: "#6a11cb" }}>VOXI</h1>
        <p style={{ color: "#2575fc", fontWeight: "500" }}>AAC Communication App for everyone</p>

        {errorMsg && <div className="text-danger mb-2">{errorMsg}</div>}

        <form onSubmit={handleLogin}>
          <input type="email" className="form-control mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="btn w-100" style={{background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)", color: "#fff"}}>Login</button>
        </form>

        <p className="mt-3" style={{ color: "#6a11cb" }}>
          Don’t have an account? <span style={{ color: "#ff7eb3", cursor: "pointer" }} onClick={() => navigate("/signup")}>Signup</span>
        </p>
      </div>
    </div>
  );
}
