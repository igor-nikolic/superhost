const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  const locals = {};
  if (req.user) locals.user = req.user;
  else locals.user = false;
  locals.title = 'SuperHost | HomePage'
  res.render("index", locals);
});
router.get("/pricing", (req, res, next) => {
  res.render("pricing", { title: "Pricings" });
});

router.get("/login", (req, res, next) => {
  const qs = req.query;
  const locals = {};
  if (qs.new) locals.newUser = true;
  if (qs.email) locals.email = qs.email;
  locals.title = "Superhost | Login page";
  if (req.isAuthenticated()) {
    req.logout();
    req.session.destroy(() => {
      console.log('Session destroyed');
    });
  }
  return res.render("login", locals);
});
router.get("/register", (req, res, next) => {
  const qs = req.query;
  console.log(qs);
  if (qs.error)
    return res.render("register", {
      title: "Superhost | Register",
      errors: ["Server Error! Please try again later!"]
    });
  return res.render("register", { title: "register" });
});

module.exports = router;
