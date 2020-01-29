const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  const locals = {};
  req.user ? locals.user = req.user : locals.user = false;
  locals.title = 'Super Host | Home Page'
  res.render("index", locals);
});

router.get("/pricing", (req, res, next) => {
  const locals = {};
  req.user ? locals.user = req.user : locals.user = false;
  locals.title = 'Super Host | Pricing'
  res.render("pricing", locals);
});

router.get("/login", (req, res, next) => {
  const qs = req.query;
  const locals = {};
  if (qs.new) locals.newUser = true;
  if (qs.email) locals.email = qs.email;
  if (qs.fail) locals.fail = "Invalid credentials!";
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
  const locals = {};
  locals.title = "Super Host | Register";
  const qs = req.query;
  console.log(qs);
  qs.error ? locals.error = ['Server Error! Please try again later'] : locals.error = null;
  return res.render("register", locals);
});

module.exports = router;
