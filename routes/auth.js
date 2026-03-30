// // const router = require("express").Router();
// // const User = require("../models/User");
// // const jwt = require("jsonwebtoken");
// // const bcrypt = require("bcrypt");

// // // REGISTER
// // router.post("/register", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = new User({ email, password });
// //     await user.save();

// //     res.json({ msg: "User registered successfully" });
// //   } 
// //     catch (err) {
// //     console.log("REGISTER ERROR 👉", err);  
// //     res.status(500).json({ msg: "Error registering user" });
// //   }
// // });

// // // LOGIN
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ msg: "Invalid credentials" });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ msg: "Invalid credentials" });
// //     }

// //     const token = jwt.sign(
// //       { id: user._id },
// //       "secretkey",
// //       { expiresIn: "1h" }
// //     );

// //     res.json({ token });

// //   } catch (err) {
// //     res.status(500).json({ msg: "Login error" });
// //   }
// // });
// // // Protected Route
// // const authMiddleware = require("../middleware/authmiddleware");

// // // PROTECTED ROUTE
// // router.get("/dashboard", authMiddleware, (req, res) => {
// //   res.json({ msg: "Welcome to dashboard 🔐", user: req.user });
// // });

// // // ✅ ALWAYS LAST
// // module.exports = router;

// const router = require("express").Router();
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const authMiddleware = require("../middleware/authmiddleware");

// // REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // ✅ CHECK IF USER EXISTS
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     // 🔐 HASH PASSWORD HERE
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       email,
//       password: hashedPassword
//     });

//     await user.save();

//     res.json({ msg: "User registered successfully" });

//   } catch (err) {
//     console.log("REGISTER ERROR 👉", err);
//     res.status(500).json({ msg: "Error registering user" });
//   }
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     // 🔐 COMPARE HASHED PASSWORD
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({ token });

//   } catch (err) {
//     res.status(500).json({ msg: "Login error" });
//   }
// });

// // PROTECTED ROUTE
// router.get("/dashboard", authMiddleware, (req, res) => {
//   res.json({ msg: "Welcome to dashboard 🔐", user: req.user });
// });

// module.exports = router;

const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/authmiddleware");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ msg: "User registered successfully" });

  } catch (err) {
    console.log("REGISTER ERROR 👉", err);
    res.status(500).json({ msg: "Error registering user" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(`Login attempt: ${email}`);

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`Failed login: ${email}`);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Failed login: ${email}`);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ msg: "Login error" });
  }
});

// PROTECTED ROUTE
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ msg: "Welcome to dashboard 🔐", user: req.user });
});

module.exports = router;