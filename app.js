require("dotenv").config();

const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const path = require("path");

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

// Static assets
app.use(express.static(path.join(__dirname, "public")));

// Template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//------------------- SESSION SETUP -------------------
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
      mageAge: 1000 * 60 * 60 * 24, // 1 day
      secure: false, // set true if using HTTPS in production
    },
  })
);

// ------------------- PASSPORT SETUP -------------------
app.use(passport.initialize());
app.use(passport.session());

// ------------------- ROUTES -------------------
app.use(routes); // routes will use controller functions

// ------------------- SERVER START -------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
