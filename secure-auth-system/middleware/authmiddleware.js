// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//     const token = req.header("Authorization");

//     if (!token) {
//         return res.status(401).json({ msg: "No token, authorization denied" });
//     }

//     try {
//         const decoded = jwt.verify(token, "secretkey");
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(401).json({ msg: "Token is not valid" });
//     }
// };

// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const token = req.header("Authorization");

//   if (!token) {
//     return res.status(401).json({ msg: "No token, access denied" });
//   }

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ msg: "Invalid token" });
//   }
// };

// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const token = req.header("Authorization");

//   if (!token) {
//     return res.status(401).json({ msg: "No token, access denied" });
//   }

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ msg: "Invalid token" });
//   }
// };


// const jwt = require("jsonwebtoken");
// const BlacklistToken = require("../models/BlacklistToken");

// module.exports = async function (req, res, next) {
//   const authHeader = req.header("Authorization");

//   if (!authHeader) {
//     return res.status(401).json({ msg: "No token, access denied" });
//   }

//   try {
//     // 🔥 Extract token (remove "Bearer ")
//     const token = authHeader.split(" ")[1];

//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;

//     next();
//   } catch (err) {
//     res.status(400).json({ msg: "Invalid token" });
//   }

// // Black List token
//   const isBlacklisted = await BlacklistToken.findOne({ token });

// if (isBlacklisted) {
//   return res.status(401).json({ msg: "Token is invalid (logged out)" });
// }

// };

const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/BlacklistToken");
const User = require("../models/User");  // For session validation


module.exports = async function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    // Extract token
    const token = authHeader.split(" ")[1];

    // Check blacklist first
    const isBlacklisted = await BlacklistToken.findOne({ token });

    if (isBlacklisted) {
      return res.status(401).json({ msg: "Token is invalid (logged out)" });
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    console.log("JWT payload:", verified);
    console.log("SessionId from token:", verified.sessionId);

    // Verify session still exists
    const user = await User.findById(verified.id);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    console.log(
      "User sessions:",
      user.sessions.map((s) => s._id.toString())
    );

    const sessionExists = user.sessions.some(
      s => s._id.toString() === verified.sessionId
    );

    console.log("Session exists:", sessionExists);

    if (!sessionExists) {
      // return res.status(401).json({ msg: "Session expired or revoked" });
      console.log("Returning 401 - session revoked");
      return res.status(401).json({ msg: "Session expired or revoked" });
    }

    console.log("Middleware completed successfully");
    // next();
    next();

  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
};