const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

exports.generateRefreshToken = () => {
  return crypto.randomBytes(40).toString("hex");
};

exports.hashToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};