const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const uuidv4 = require('uuid/v4');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const config = require('config');
const passport = require('passport');


//Router files
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const connection = require("./db/connection");

const app = express();

//Passport config
require('./config/passport')(passport);

// Redis initialization
const redisClient = redis.createClient();
redisClient.on('error', (err) => {
  console.error(`Redis error ${err}`);
});
redisClient.on("ready", () => {
  console.log("Redis ready!")
});

app.use(session({
  genid: (req) => {
    return uuidv4();
  },
  store: new redisStore({ host: 'localhost', port: 6379, client: redisClient }),
  name: '_redisTest',
  secret: config.get('sessionSecret'),
  resave: false,
  cookie: { secure: false, maxAge: 600000 }, // Set to secure:false and expire in 1 minute for demo purposes
  saveUninitialized: true
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

// Mysql Connection
connection.connect(err => {
  if (err) {
    console.error("error connecting to db: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

module.exports = app;
