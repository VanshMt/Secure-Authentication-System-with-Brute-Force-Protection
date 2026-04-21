import React, { useState } from "react";
import API from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgot = async () => {
    try {
      await API.post("/auth/forgot-password", { email });
      alert("Reset link sent to email");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgot}>Send Reset Link</button>
    </div>
  );
};

export default ForgotPassword;