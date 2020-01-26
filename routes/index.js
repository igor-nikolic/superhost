const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});
router.get("/pricing", (req, res, next) => {
  res.render("pricing", { title: "Pricings" });
});

router.get("/login", (req, res, next) => {
  const qs = req.query;
  console.log(qs);
  res.render("login", { title: "login", email: qs.email });
});
router.get("/register", (req, res, next) => {
  const qs = req.query;
  console.log(qs);
  if (qs.error)
    return res.render("register", {
      title: "Register",
      errors: ["Server Error! Please try again later!"]
    });
  return res.render("register", { title: "register" });
});

module.exports = router;
