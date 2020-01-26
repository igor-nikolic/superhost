const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../db/model/User");

router.post("/login", (req, res, next) => {
  const { loginEmail, loginPassword } = req.body;
});
router.post("/register", async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = hashed;
    const saved = await user.registerUser();
    const encodedEmail = encodeURIComponent(email);
    return res.redirect(`/login?new=true&email=${encodedEmail}`);
  } catch (error) {
    console.error(error.message);
    return res.redirect("/register?error=true");
  }
});
router.post("/checkemail", async (req, res, next) => {
  const { email } = req.body;
  const user = new User();
  user.email = email;
  const available = await user.checkEmailAvailability();
  res.json({ available });
});
module.exports = router;
