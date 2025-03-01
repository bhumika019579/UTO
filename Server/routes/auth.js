const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../config/jwt");

const router = express.Router();

const users = [];

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5143/");
  }
);
router.post("/Signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password: hashedPassword,
  };
  users.push(newUser);

  // Generate a token
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    "JWT_SECRET",
    { expiresIn: "1h" }
  );

  res.cookie("token", token, { httpOnly: true, secure: false });
  res.json({ success: true, user: newUser, token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, "SECRET_KEY", {
    expiresIn: "1h",
  });

  res.cookie("token", token, { httpOnly: true, secure: false });
  res.json({ user: { id: user.id, email: user.email }, token });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

router.get("/user", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
