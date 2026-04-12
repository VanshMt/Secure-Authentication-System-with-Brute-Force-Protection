// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const rateLimit = require("express-rate-limit");
// const app = express();
// app.use(express.json());


// // Routes
// const authRoutes = require("./routes/auth");
// app.use("/auth", authRoutes);

// // Connect DB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected ✅"))
//   .catch(err => console.log(err));

// app.get("/", (req, res) => {
//   res.send("Server running ");
// });

// app.listen(3000, () => {
//   console.log("Server started on port 3000");
// });

// const rateLimit = require("express-rate-limit");

// // Limit login attempts
// const loginLimiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute
//   max: 5, // max 5 requests per minute
//   message: "Too many login attempts. Try again later."
// });

// // Apply only to login route
// app.use("/auth/login", loginLimiter);

// // const authRoutes = require("./routes/auth");
// // app.use("/auth", authRoutes);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

const app = express();
app.set("trust proxy", 1); // For rate limiter to work behind proxies
app.use(express.json());

// COOKIE PARSER (For refresh token in cookies)
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// RATE LIMITER (Brute force protection)
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50, // max 5 attempts
  message: "Too many login attempts. Try again later."
});

// Apply limiter ONLY to login
app.use("/auth/login", loginLimiter);

// Routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// Start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

