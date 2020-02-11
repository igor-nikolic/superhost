const express = require("express");
const router = express.Router();
const storeCalendar = require('../functions/storeCalendar');
/* GET home page. */
router.get("/", (req, res, next) => {
  const locals = {};
  console.log("korisnik");
  console.log(req.user);
  req.user ? locals.user = req.user : locals.user = false;
  locals.title = 'Super Host | Home Page'
  res.render("index", locals);
});

router.get('/about', (req, res, next) => {
  const locals = {};
  req.user ? locals.user = req.user : locals.user = false;
  locals.title = 'Super Host | About Page'
  res.render("about", locals);
});

router.get('/platform', (req, res, next) => {
  const locals = {};
  req.user ? locals.user = req.user : locals.user = false;
  locals.title = 'Super Host | Platform we support'
  res.render("platform", locals);
});

router.get("/pricing", (req, res, next) => {
  const locals = {};
  req.user ? locals.user = req.user : locals.user = false;
  locals.title = 'Super Host | Pricing'
  res.render("pricing", locals);
});

router.get('/calendar', async (req, res) => {
  const locals = {};
  req.user ? locals.user = req.user : locals.user = false;
  try {
    let calendar = await storeCalendar('https://www.airbnb.com/calendar/ical/39866072.ics?s=36b082d54414f3e2026299013745d848', 'test2');
    let parsedCal = JSON.parse(calendar);
    const events = parsedCal.VCALENDAR[0].VEVENT;
    
    return res.render('calendar', locals);
  } catch (error) {
    console.error(`error ${error}`);
    return res.render('error');
  }
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
  qs.error ? locals.errors = ['Server Error! Please try again later'] : locals.errors = null;
  return res.render("register", locals);
});

module.exports = router;
