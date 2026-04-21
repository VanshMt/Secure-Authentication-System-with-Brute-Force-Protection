import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, Link, useLocation} from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [error, setError] = useState("");
//   const [timeLeft, setTimeLeft] = useState(null);

//   const handleLogin = async () => {
//     console.log("CLicked");

//     useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     if (params.get("verified") === "true") {
//       setError("Email verified successfully ✅ You can login now");
//     }
//   }, [location]);  

//     try {
//       const res = await API.post("/auth/login", { email, password });
//       console.log(email, password);
//       console.log(res.data);
//       localStorage.setItem("token", res.data.accessToken);
//       navigate("/dashboard");
//     } catch (err) {
//       console.log(err.response?.data?.msg || "Login Failed");
//       setError(err.response?.data?.msg || "Login Failed");
//     }

//     //lockUntil
//     const lockTime = err.response?.data?.lockUntil;
//     if(lockTime){
//         localStorage.setItem("lockUntil", lockTime);
//     }

//     useEffect(() => {
//   const lockUntil = localStorage.getItem("lockUntil");

//   if (lockUntil) {
//     const interval = setInterval(() => {
//       const remaining = Math.floor((lockUntil - Date.now()) / 1000);

//       if (remaining <= 0) {
//         clearInterval(interval);
//         localStorage.removeItem("lockUntil");
//         setTimeLeft(null);
//       } else {
//         setTimeLeft(remaining);
//       }
//     }, 1000);

//        return () => clearInterval(interval);
//         }
//     }, []);
//   };

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ EMAIL VERIFIED MESSAGE
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("verified") === "true") {
      setError("Email verified successfully ✅ You can login now");
    }
  }, [location]);

  // ✅ COUNTDOWN TIMER
  useEffect(() => {
    const lockUntil = localStorage.getItem("lockUntil");

    if (lockUntil) {
      const interval = setInterval(() => {
        const remaining = Math.floor((lockUntil - Date.now()) / 1000);

        if (remaining <= 0) {
          clearInterval(interval);
          localStorage.removeItem("lockUntil");
          setTimeLeft(null);
        } else {
          setTimeLeft(remaining);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  // ✅ LOGIN FUNCTION
  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.accessToken);
      navigate("/dashboard");

    } catch (err) {
      const msg = err.response?.data?.msg || "Login Failed";
      const lockTime = err.response?.data?.lockUntil;

      setError(msg);

      if (lockTime) {
        localStorage.setItem("lockUntil", lockTime);
      }
    }
  };

  // ✅ FORMAT TIME
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };


  return (
    // <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
    //   <h2>Login</h2>
    //   <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
    //   <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
    //   <button onClick={handleLogin} style={{ width: "100%", padding: "10px" }}>Login</button>
    //   <p>Don't have an account? <Link to="/signup">Signup</Link></p>
    // </div>

    <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
  <h2>Login</h2>

  <input
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
  />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
  />

  <button
    onClick={handleLogin}
    style={{ width: "100%", padding: "10px" }}
  >
    Login
  </button>
  {error && (
  <p style={{ color: "red", marginTop: "10px" }}>
    {error}
  </p>
    )}

    {/* 🔥 ERROR / TIMER */}
      {timeLeft ? (
        <p style={{ color: "red" }}>
          Account locked. Try again in {formatTime(timeLeft)}
        </p>
      ) : (
        error && <p style={{ color: "red" }}>{error}</p>
      )}
  <p>
  Forgot password? <Link to="/forgot-password">Reset here</Link>
  </p>
  <p>
    Don't have an account? <Link to="/signup">Signup</Link>
  </p>
  
</div>
  );
};

export default Login;