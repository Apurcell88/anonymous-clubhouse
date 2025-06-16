require("dotenv").config();

const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const path = require("path");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const helmet = require("helmet");

// Custom imports
const pool = require("./config/pool");
require("./config/passport");
const routes = require("./routes");

// Initialize Express
const app = express();

// ------------------- MIDDLEWARE -------------------

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

// Static assets
app.use(express.static("public"));

// Template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//------------------- SESSION SETUP -------------------
app.set("trust proxy", 1);

app.use(
  session({
    store: new pgSession({
      pool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production",
    },
  })
);

// ------------------- FLASH SETUP -------------------
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error"); // Passport uses this for login errors
  next();
});

// ------------------- PASSPORT SETUP -------------------
app.use(passport.initialize());
app.use(passport.session());

// Make the current user available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null; // user comes from passport
  next();
});

// ------------------- ROUTES -------------------
app.use(routes); // routes will use controller functions

// ------------------- SERVER START -------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
