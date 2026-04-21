import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/register", { email, password });
      navigate("/login");
    } catch (err) {
      alert("Signup Failed");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
      <h2>Signup</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
      <button onClick={handleSignup} style={{ width: "100%", padding: "10px" }}>Signup</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;